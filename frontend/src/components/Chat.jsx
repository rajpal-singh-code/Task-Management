import React, { useEffect, useState } from "react";
import api from "../utils/axios";

const Chat = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);


  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/notes");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await api.post("/api/notes", { title, content, status });
      setTitle("");
      setContent("");
      setStatus("pending");
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  
  const toggleStatus = async (task) => {
    try {
      const updated = await api.put(`/api/notes/${task._id}`, {
        status: task.status === "completed" ? "pending" : "completed",
      });

      setTasks(
        tasks.map((t) => (t._id === task._id ? updated.data : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Task <span className="text-emerald-400">Workspace</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Manage your tasks intelligently 🚀
          </p>
        </div>

        
        <form
          onSubmit={handleCreate}
          className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 mb-10"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
            />

            <input
              type="text"
              placeholder="Description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            disabled={loading}
            className="mt-6 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition text-black font-bold text-sm"
          >
            {loading ? "Creating..." : "Add Task"}
          </button>
        </form>

       
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {task.content}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => toggleStatus(task)}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs"
                >
                  Toggle
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="flex-1 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-slate-500 mt-16 text-sm">
            No tasks yet. Start by adding one ✨
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;
