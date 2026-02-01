import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/notes");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/api/notes/${editing._id}`, editing);

      setProjects(
        projects.map((p) =>
          p._id === editing._id ? res.data : p
        )
      );

      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-10">
          My <span className="text-emerald-400">Projects</span>
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-5"
            >
              {editing?._id === project._id ? (
                <>
                  <input
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10"
                  />

                  <input
                    value={editing.content}
                    onChange={(e) =>
                      setEditing({ ...editing, content: e.target.value })
                    }
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10"
                  />

                  <select
                    value={editing.status}
                    onChange={(e) =>
                      setEditing({ ...editing, status: e.target.value })
                    }
                    className="w-full mb-4 px-3 py-2 rounded-lg bg-black/40 border border-white/10"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>

                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="flex-1 py-2 rounded-lg bg-white/10 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {project.content}
                  </p>

                  <span
                    className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${
                      project.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setEditing(project)}
                      className="flex-1 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-slate-500 mt-16 text-sm">
            No projects found
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
