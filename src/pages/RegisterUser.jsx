// src/components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import { Plus, Pencil, Users2 } from "lucide-react";
import Loader from "../components/loader";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "react-hot-toast";
import CustomToast from "../components/Toast";
import { CancelButton } from "../components/ui/cancelbutton";
import SmallTableButton from "../components/ui/smallTableButton";

const UserManagement = () => {
  const user_types = ["Employee", "Partner"];
  const [errorMessage, setErrorMessage] = useState("");
  const [editingUser_id, setEditingUser_id] = useState(null)
  const [showNotification, setShowNotification] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success', 'error', 'warning', 'info'
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({ email_search: "", user_type_search: "", job_title_search: "", status_search: "" });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    job_title: "",
    user_type: "",
    is_active: true,
    assigned_to: "",
  });

  const projectid = new URL(import.meta.env.VITE_SUPABASE_URL).host.split(".")[0];

   const fetchUsers = async () => {
    try {
      const res = await fetch(
        `https://${projectid}.functions.supabase.co/get-all-users`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) throw new Error(res.statusText);
      
      const { users: raw } = await res.json();
      
      const mapped = raw.map((u) => ({
        id: u.id,
        email: u.email,
        first_name: u.first_name || "",
        last_name: u.last_name || "",
        user_type: u.user_metadata?.user_type || "",
        user_role: u.user_metadata?.user_role || "",
        is_active:  u.user_metadata?.is_active || false,
        assigned_to: u.assigned_to || "",
        job_title: u.job_title || "",
        
      })); 


      setUsers(mapped);
      setFilteredUsers(mapped);
      setLoading(false);
    } catch (err) {
      setToastMessage("Failed to load users. Please try again later/ contact support.");
      setToastType("error");
      setToast(true);
      setLoading(false);
      setUsers([]);
      setFilteredUsers([]);
    }
  };


  useEffect(() => {
     fetchUsers();

  }, []);

  useEffect(() => {
    console.log("Filtering users with filters:", users);
    const filtered = users.filter((user) => {
      const matchesEmail = user.email?.toLowerCase().includes(filters.email_search.toLowerCase());
      const matchesType = user.user_type?.toLowerCase().includes(filters.user_type_search.toLowerCase());
      const matchesJob = user.job_title?.toLowerCase().includes(filters.job_title_search.toLowerCase());
     const matchesStatus =
  filters.status_search === "" ||
  (filters.status_search === "active" && user.is_active === true) ||
  (filters.status_search === "inactive" && user.is_active === false);

      return matchesEmail && matchesType && matchesJob && matchesStatus;
    });

    setFilteredUsers(filtered);
  }, [users, filters]);

  const openAddModal = () => {
    setForm({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
      job_title: "",
      user_type: "",
      is_active: true,
      assigned_to: "",
      category_access: categories.map(c => ({ category_id: c.id, access: "none" }))
    });
    setEditingUser(null);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setForm({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: "",
      confirmPassword: "",
      job_title: user.job_title,
      user_type: user.user_type,
      is_active:  user.is_active ,
      assigned_to: user.assigned_to,
      category_access: user.category_access
    });
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    if(editingUser)
    {
          const user = {
            user_id: editingUser_id,
            job_title: form.job_title,
            user_type: form.user_type,
            is_active: form.is_active,
            assigned_to: form.assigned_to,
          };

          console.log("Editing user:", user);

          handleEditUser(user);
          return;
    }
    else{

      if (!form.email || !form.password || !form.first_name || !form.last_name) {
        setToastMessage("Required fields missing");
        setToastType("error");
        setToast(true);
        setTimeout(() => setToast(false), 5000);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setToastMessage("Passwords do not match");
        setToastType("error");
        setToast(true);
        setTimeout(() => setToast(false), 5000);
        return;
      }

      const url = `https://${projectid}.functions.supabase.co/create-user`;
      const method = "POST";
      
      const payload = {
        email: form.email.trim().replace(/['"]/g, ""),
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        user_type: form.user_type,
        user_role: form.role || "genUser",
        is_active: !!form.is_active,
      };

        if (payload.email.length < 6) {
        setToastMessage("Email is too short");
        setToastType("error");
        setToast(true);
        setTimeout(() => setToast(false), 5000);
        return;
        }

      try {
        setLoading(true);
        const verifyRes = await fetch(
          `https://${projectid}.functions.supabase.co/Verify_Email`,
            {
            method,
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const verifyData = await verifyRes.json();

      if (verifyData.result === "undeliverable") {
        setToastMessage("Invalid or undeliverable email address.");
        setToastType("error");
        setToast(true);
        setTimeout(() => setToast(false), 5000);
        return;
      }

      console.log("📨 creating user with email:", payload.email);

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      setShowModal(false);
      await fetchUsers();
      setLoading(false);
      
      } catch (err) {
        setToastMessage("Save Failed. Please try again / or contact support.");
          setToastType("error");
          setToast(true);
          setTimeout(() => setToast(false), 5000);
        setShowModal(false);
        setLoading(false);
      }
    }
    setEditingUser(null);
  };

  const handleEditUser = async (user) => {
    const method = "POST";
    const url = `https://${projectid}.functions.supabase.co/edit-user-details`;

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (data.result === "success") {
      setToastMessage("User updated successfully");
      setToastType("success");
      setToast(true);
      setTimeout(() => setToast(false), 5000);
      await fetchUsers();
      setShowModal(false);
      setLoading(false);

    }
    else {
      setToastMessage("Failed to update user");
      setToastType("error");
      setToast(true);
      setTimeout(() => setToast(false), 5000);
      setLoading(false);
    }
  }


  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <Button onClick={openAddModal}><Plus className="mr-2" /> Add User</Button>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <Input placeholder="Search by Email" value={filters.email_search} onChange={(e) => setFilters({ ...filters, email_search: e.target.value })} />
        <select
          className="border-1 border-gray-300 rounded-md p-2"
          value={filters.user_type_search}
          onChange={(e) => setFilters({ ...filters, user_type_search: e.target.value })}
          >
          <option value="">All</option>
          <option value="employee">Employee</option>
          <option value="partner">Partner</option>
        </select>

        <Input placeholder="Job" value={filters.job_title_search} onChange={(e) => setFilters({ ...filters, job_title_search: e.target.value })} />
        {/* <Input placeholder="Status" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} /> */}
        {/*  Filter by Active status */}
        <select
          className="border-1 border-gray-300 rounded-md p-2"
          value={filters.status_search}
          onChange={(e) => setFilters({ ...filters, status_search: e.target.value })}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
       
      <table className="w-full text-sm text-left text-gray-800 ">
        <thead className="bg-gray-200 text-gray-800 ">
          <tr className="border-b border-gray-300">
            <th className="py-3 px-2">Name</th>
            <th className="py-3 px-2">Surname</th>
            <th className="py-3 px-2">Email</th>
            <th className="py-3 px-2">User Type</th>
            <th className="py-3 px-2">Job Title</th>
            <th className="py-3 px-2">Active</th>
            <th className="py-3 px-2">Assigned To</th>
            {/* <th>Category Access</th> */}
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9}><Loader /></td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center">No users found.</td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr className="p-2" key={user.id}>
                <td className="px-2">{user.first_name}</td>
                <td className="px-2">{user.last_name}</td>
                <td className="px-2">{user.email}</td>
                <td className="px-2">{user.user_type}</td>
                <td className="px-2">{user.job_title}</td>
                <td className="px-2">
                  <input
                    type="checkbox"
                    checked={user.is_active === true}
                    disabled
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-sm not-checked:border-1 not-checked:bg-white not-checked:border-grap-400 checked:bg-green-500 checked:border-transparent cursor-not-allowed"
                  />
                </td>
                <td className="px-2">{user.assigned_to}</td>
                {/* <td>{user.category_access.length} categories</td> */}
                <td className="px-2">
                  <SmallTableButton onClick={() => {openEditModal(user);setEditingUser_id( user.id);}} variant="outline" size="sm"><Pencil size={14} /> Edit</SmallTableButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <DialogTrigger />
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
            <p className="text-red-600 text-xl cursor-pointer" onClick={() => setShowModal(false)} >x</p>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input disabled={editingUser}  placeholder="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
            <Input disabled={editingUser}placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
            <Input disabled={editingUser} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {!editingUser && (
              <>
                <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <Input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
              </>
            )}
            <Input placeholder="Job Title" value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Label>User Type</Label>
              <select className="border-1 border-gray-300 rounded-md p-2" value={form.user_type} onChange={(e) => setForm({ ...form, user_type: e.target.value })}>
                <option value="">Select User Type</option>
                {user_types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Label>Assigned To</Label>
              <select className="border-1 border-gray-300 rounded-md p-2" value={form.assigned_to} onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}>
                <option value="">--</option>
                {filteredUsers.map(u => <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>)}
              </select>
            </div>
            <div>
              <input type="checkbox" checked={form.is_active} onChange={() => setForm({ ...form, is_active: !form.is_active })} /> Active
            </div>
          </div>

          <DialogFooter>
            <CancelButton variant="outline" onClick={() => setShowModal(false)}>Cancel</CancelButton>
            <Button className={loading ? "cursor-wait opacity-80" : ""} onClick={() => { setLoading(true); handleSave(); }}>{editingUser ? "Save Changes" : "Create User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      { toast && (
      <CustomToast message={toastMessage} type={toastType} />
      )}


    </div>
  );
};

export default UserManagement;
