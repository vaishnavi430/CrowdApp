import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
    avatar: "",
  });

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");

        const data = res.data;

        if (data.success) {
          setForm({
            name: data.user.name || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            bio: data.user.bio || "",
            avatar: data.user.avatar || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(
        "/users/profile",
        form
      );

      const data = res.data;

      if (data.success) {
        alert("Profile Updated Successfully");
        navigate("/dashboard/profile");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          className="w-full rounded-xl border p-3"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-xl border p-3"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-xl border p-3"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-xl border p-3"
          name="avatar"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
        />

        <textarea
          className="w-full rounded-xl border p-3"
          rows="5"
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
        />

        <button
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;