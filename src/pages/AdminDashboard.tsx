import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emeka } from "../utils/assets";
import { useAdminStore } from "../store/adminStore";
import { toast } from "sonner";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, isAuthenticated, logout, users, setUsers, updateUserRole } =
    useAdminStore();

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    // Fetch users from API
    fetchUsers();
  }, [isAuthenticated, navigate]);

  const fetchUsers = async () => {
    try {
      // Replace with actual API call
      const mockUsers: User[] = [
        {
          id: "1",
          firstname: "John",
          lastname: "Doe",
          email: "john@example.com",
          role: "Developer",
        },
        {
          id: "2",
          firstname: "Jane",
          lastname: "Smith",
          email: "jane@example.com",
          role: "Designer",
        },
        {
          id: "3",
          firstname: "Mike",
          lastname: "Johnson",
          email: "mike@example.com",
          role: "Manager",
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const openFileModal = (user: User) => {
    setSelectedUser(user);
    setFiles([]);
    setShowFileModal(true);
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole.trim()) {
      return toast.error("Please enter a role");
    }

    setLoading(true);
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateUserRole(selectedUser.id, newRole);
      toast.success("Role updated successfully");
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedUser || files.length === 0) {
      return toast.error("Please select at least one file");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", selectedUser.id);
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Files uploaded successfully");
      setShowFileModal(false);
      setSelectedUser(null);
      setFiles([]);
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={emeka}
                draggable={false}
                alt="logo"
                className="w-[60px] h-auto"
              />
            </div>
            {/* Avatar and Username */}
            <div className="flex items-center gap-x-4">
              <span className="text-sm font-medium text-[#333333]">
                {admin?.username}
              </span>
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 rounded-full bg-[#15411F] flex items-center justify-center text-white font-semibold">
                  {admin?.username?.charAt(0) || "A"}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[#333333] mb-6">
          User Management
        </h1>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-gray-100 px-6 py-4 font-semibold text-[#333333] text-sm">
            <div className="col-span-3">Full Name</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-4 text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition items-center"
              >
                <div className="col-span-3 text-[#333333] font-medium">
                  {user.firstname} {user.lastname}
                </div>
                <div className="col-span-3 text-[#5C5C5C] text-sm">
                  {user.email}
                </div>
                <div className="col-span-2">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium  bg-opacity-10 text-[#15411F]">
                    {user.role}
                  </span>
                </div>
                <div className="col-span-4 flex gap-x-3 justify-center">
                  <button
                    onClick={() => openRoleModal(user)}
                    className="px-4 py-2 bg-[#15411F] text-white rounded text-sm font-medium hover:bg-[#1a5228] transition"
                  >
                    Change Role
                  </button>
                  <button
                    onClick={() => openFileModal(user)}
                    className="px-4 py-2 bg-[#15411F] text-white rounded text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Add File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#333333] mb-4">
              Change User Role
            </h2>
            <p className="text-sm text-[#5C5C5C] mb-4">
              User: {selectedUser?.firstname} {selectedUser?.lastname}
            </p>
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border border-[#B9B9B9] h-[50px] px-4 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none mb-6"
              placeholder="Enter new role"
            />
            <div className="flex gap-x-3">
              <button
                onClick={() => setShowRoleModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#15411F] text-white rounded-lg font-medium hover:bg-[#1a5228] transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add File Modal */}
      {showFileModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-10 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#333333] mb-4">
              Add Files to User
            </h2>
            <p className="text-sm text-[#5C5C5C] mb-4">
              User: {selectedUser?.firstname} {selectedUser?.lastname}
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className=" h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
            />
            {files.length > 0 && (
              <div className="mb-4 space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                  >
                    <span className="text-sm text-[#333333] truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-x-3">
              <button
                onClick={() => setShowFileModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                disabled={loading || files.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Files"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
