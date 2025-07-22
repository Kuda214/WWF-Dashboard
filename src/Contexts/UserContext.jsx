import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);                // full Supabase user object
  const [userId, setUserId] = useState(null);            // extracted user ID
  const [userType, setUserType] = useState(null);        // 'employee' | 'partner'
  const [jobDescription, setJobDescription] = useState(null); // extracted job description
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const init = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const activeUser = session?.user;

    if (activeUser) {
      const metadata = activeUser.user_metadata || {};
      setUser(activeUser);
      setUserId(activeUser.id);
      setUserType(metadata.user_role?.toLowerCase() || null);
      setJobDescription(metadata.job_description || null);
    }

    setLoading(false);
  };

  init();

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    const authUser = session?.user;
    const metadata = authUser?.user_metadata || {};
    setUser(authUser);
    setUserId(authUser?.id || null);
    setUserType(metadata.user_role?.toLowerCase() || null);
    setJobDescription(metadata.job_description || null);
  });


  return () => listener?.subscription?.unsubscribe();
}, []);

useEffect(() => {
  if (user) {
  }
}, [user]);


  return (
    <UserContext.Provider value={{ user, userId, userType, jobDescription, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
