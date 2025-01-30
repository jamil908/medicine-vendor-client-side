

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/axiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider(); // Initialize the GoogleAuthProvider
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
    
  };

  const updateUserProfile = async (name, photo) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    // Ensure updated profile is fetched
    await auth.currentUser.reload();
    const updatedUser = auth.currentUser;

    await axiosPublic.post(`/users/${updatedUser.email}`, {
      name: updatedUser.displayName,
      image: updatedUser.photoURL,
      email: updatedUser.email,
    });

    setUser({...updatedUser}); 
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("Current user:", currentUser);

        // Check and save user to database
        if (currentUser.displayName && currentUser.photoURL) {
          await axiosPublic.post(`/users/${currentUser.email}`, {
            name: currentUser.displayName,
            image: currentUser.photoURL,
            email: currentUser.email,
          });
        }
        const userInfo = {email: currentUser.email};
        axiosPublic.post('/jwt',userInfo)
        .then(res =>{
          if(res.data.token){
            localStorage.setItem('access-token',res.data.token);
            setLoading(false);

          }
        })

        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem('access-token');
        setLoading(false);

      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    googleSignIn,
    signIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
