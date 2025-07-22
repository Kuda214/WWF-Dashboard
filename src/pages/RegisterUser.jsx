// src/components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Plus } from "lucide-react";
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

// Initialise Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const UserManagement = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                  */
  /* -------------------------------------------------------------------------- */
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    email: "",
    role: "",
    job_description: "",
    usertype: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    role: "",
    job_description: "",
    usertype: "",
    isactive: 1 // 1 = active, 0 = inactive
  });

  /* -------------------------------------------------------------------------- */
  /*                               Helper values                                */
  /* -------------------------------------------------------------------------- */
  const projectid = new URL(import.meta.env.VITE_SUPABASE_URL).host.split(".")[0];

  /* -------------------------------------------------------------------------- */
  /*                              Data ‑ fetch/update                           */
  /* -------------------------------------------------------------------------- */
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `https://${projectid}.functions.supabase.co/super-action`,
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
        role: u.role || "user",
        job_description: u.user_metadata?.job_description || "",
        usertype: u.user_metadata?.user_type || "",
        isactive: u.user_metadata?.isactive ?? 0 // int2 0/1
      }));

      setUsers(mapped);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Could not load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                 Filtering                                  */
  /* -------------------------------------------------------------------------- */
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    u.role.toLowerCase().includes(filters.role.toLowerCase()) &&
    u.job_description.toLowerCase().includes(filters.job_description.toLowerCase()) &&
    u.usertype.toLowerCase().includes(filters.usertype.toLowerCase())
  );

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */
  const resetForm = () => {
    setForm({
      email: "",
      role: "",
      job_description: "",
      usertype: "",
      isactive: 1
    });
    setEditingUser(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setForm({
      email: user.email,
      role: user.role,
      job_description: user.job_description,
      usertype: user.usertype,
      isactive: user.isactive
    });
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        /* ---------------------------- Update existing ---------------------------- */
        const { error } = await supabase.auth.admin.updateUserById(editingUser.id, {
          email: form.email,
          role: form.role,
          user_metadata: {
            job_description: form.job_description,
            user_type: form.usertype,
            isactive: form.isactive
          }
        });
        if (error) throw error;
        toast.success("User updated");
      } else {
        /* ------------------------------ Create new ------------------------------ */
        const tempPassword = crypto.randomUUID().slice(0, 16); // temporary password
        const { error } = await supabase.auth.admin.createUser({
          email: form.email,
          password: tempPassword,
          role: form.role,
          email_confirm: false,
          user_metadata: {
            job_description: form.job_description,
            user_type: form.usertype,
            isactive: form.isactive
          }
        });
        if (error) throw error;
        toast.success("User created");
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleToggleActive = async (user) => {
    const newVal = user.isactive === 1 ? 0 : 1;
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { isactive: newVal }
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    fetchUsers();
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Render                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={openAddModal} className="gap-2">
          <Plus size={18} /> Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
        <Input
          placeholder="Filter by role"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        />
        <Input
          placeholder="Filter by job description"
          value={filters.job_description}
          onChange={(e) => setFilters({ ...filters, job_description: e.target.value })}
        />
        <Input
          placeholder="Filter by usertype"
          value={filters.usertype}
          onChange={(e) => setFilters({ ...filters, usertype: e.target.value })}
        />
        <div />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Job Description</th>
              <th className="px-6 py-3 text-left">Usertype</th>
              <th className="px-6 py-3 text-left">Active</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.job_description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.usertype}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={user.isactive === 1}
                    onChange={() => handleToggleActive(user)}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={(open) => !open && setShowModal(false)}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right col-span-1">
                Email
              </Label>
              <Input
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right col-span-1">
                Role
              </Label>
              <Input
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job" className="text-right col-span-1">
                Job Description
              </Label>
              <Input
                id="job"
                value={form.job_description}
                onChange={(e) => setForm({ ...form, job_description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="usertype" className="text-right col-span-1">
                Usertype
              </Label>
              <Input
                id="usertype"
                value={form.usertype}
                onChange={(e) => setForm({ ...form, usertype: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={form.isactive === 1}
                onChange={() =>
                  setForm({ ...form, isactive: form.isactive === 1 ? 0 : 1 })
                }
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
