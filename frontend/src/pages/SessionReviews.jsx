import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { AvatarCircle, GLOBAL_STYLES, GYM_BG_URL } from "../shared/shared";

export default function SessionReviews() {
  const { id } = useParams(); // session id
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews]       = useState([]);
  const [session, setSession]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form, setForm]             = useState({ content: "", rating: 5 });
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId]   = useState(null);
  const [editForm, setEditForm]     = useState({ content: "", rating: 5 });
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    fetchSession();
    fetchReviews();
  }, [id]);

  const fetchSession = async () => {
    try {
      const res = await axios.get(`/api/sessions/${id}`);
      setSession(res.data);
    } catch {
      // non-critical
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/reviews/session/${id}`);
      setReviews(res.data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const alreadyReviewed = user && reviews.some(r => r.authorId === user.id);
  const canReview       = user && session?.sessionStatus === "COMPLETED" && !alreadyReviewed;

  const handleSubmit = async () => {
    const errors = {};
    if (!form.content.trim()) errors.content = "Review cannot be empty.";
    if (form.rating < 1 || form.rating > 5) errors.rating = "Rating must be between 1 and 5.";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

    setSubmitLoading(true);
    try {
      await axios.post("/api/reviews", {
        content: form.content,
        rating: Number(form.rating),
        sessionId: id,
        authorId: user.id,
      });
      setForm({ content: "", rating: 5 });
      setFormErrors({});
      await fetchReviews();
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === "object") setFormErrors(data);
      else setFormErrors({ general: data || "Could not submit review." });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`/api/reviews/${reviewId}?authorId=${user.id}`);
      await fetchReviews();
    } catch (err) {
      alert(err.response?.data || "Could not delete review.");
    }
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEditForm({ content: review.content, rating: review.rating });
    setEditErrors({});
  };

  const handleEditSubmit = async (reviewId) => {
    const errors = {};
    if (!editForm.content.trim()) errors.content = "Review cannot be empty.";
    if (editForm.rating < 1 || editForm.rating > 5) errors.rating = "Rating must be between 1 and 5.";
    if (Object.keys(errors).length > 0) { setEditErrors(errors); return; }

    try {
      await axios.put(`/api/reviews/${reviewId}?authorId=${user.id}`, editForm);
      setEditingId(null);
      await fetchReviews();
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === "object") setEditErrors(data);
      else setEditErrors({ general: data || "Could not update review." });
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.72)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `url('${GYM_BG_URL}') center/cover`, filter: "brightness(0.28)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "32px 36px 0" }}>
          <button onClick={() => navigate(`/session/${id}`)} style={backBtn}>← Back to session</button>
          <h1 style={{
            margin: "10px 0 0", fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: 1,
          }}>
            {session ? `Reviews · ${session.title}` : "Session Reviews"}
          </h1>
        </div>
      </div>

      <div style={{ padding: "28px 36px 60px", background: "#111", maxWidth: 800, margin: "0 auto" }}>

        {/* Summary */}
        {reviews.length > 0 && (
          <div style={{
            background: "#181818", border: "1px solid #252525", borderRadius: 16,
            padding: "20px 28px", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 24,
          }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 48, fontWeight: 800, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>
                {avgRating}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#666" }}>avg rating</p>
            </div>
            <div style={{ width: 1, height: 50, background: "#252525" }} />
            <div>
              <StarRow rating={Math.round(avgRating)} size={22} />
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "#666" }}>
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        {/* Write a review */}
        {canReview && (
          <div style={{
            background: "#181818", border: "1px solid #252525",
            borderRadius: 16, padding: 24, marginBottom: 28,
          }}>
            <h3 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 700, color: "#fff" }}>
              Leave a Review
            </h3>

            {formErrors.general && (
              <p style={{ margin: "0 0 12px", color: "#e07070", fontSize: 13 }}>⚠️ {formErrors.general}</p>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Rating</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 28, opacity: n <= form.rating ? 1 : 0.25,
                      transition: "opacity 0.15s", padding: 0,
                    }}>
                    ★
                  </button>
                ))}
                <span style={{ color: "#666", fontSize: 13, marginLeft: 4 }}>{form.rating}/5</span>
              </div>
              {formErrors.rating && <p style={errStyle}>⚠️ {formErrors.rating}</p>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Your Review</label>
              <textarea
                value={form.content}
                onChange={e => { setForm(p => ({ ...p, content: e.target.value })); setFormErrors(p => ({ ...p, content: null })); }}
                rows={4}
                placeholder="How was the session? Was the host reliable?"
                style={{
                  width: "100%", background: "#1a1a1a",
                  border: `1px solid ${formErrors.content ? "#6b2d2d" : "#2a2a2a"}`,
                  borderRadius: 10, color: "#e0e0e0", fontSize: 14,
                  padding: 12, resize: "vertical", lineHeight: 1.65,
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
              {formErrors.content && <p style={errStyle}>⚠️ {formErrors.content}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitLoading}
              style={{
                background: "#2563eb", border: "none", color: "#fff",
                borderRadius: 10, padding: "11px 28px", fontSize: 14,
                fontWeight: 700, cursor: submitLoading ? "not-allowed" : "pointer",
                opacity: submitLoading ? 0.7 : 1,
              }}
            >
              {submitLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}

        {/* Why can't review */}
        {user && !canReview && !alreadyReviewed && session?.sessionStatus !== "COMPLETED" && (
          <div style={{
            background: "#181818", border: "1px solid #252525",
            borderRadius: 12, padding: "14px 20px", marginBottom: 24,
            color: "#666", fontSize: 14,
          }}>
            Reviews are only available once the session is completed.
          </div>
        )}

        {/* Review list */}
        {loading ? (
          <p style={{ color: "#555", fontSize: 14 }}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p style={{ color: "#555", fontSize: 14 }}>No reviews yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {reviews.map(r => {
              const isOwn    = user?.id === r.authorId;
              const isEditing = editingId === r.id;
              const initials  = r.authorUsername?.slice(0, 2).toUpperCase() ?? "??";

              return (
                <div key={r.id} style={{
                  background: "#181818", border: "1px solid #252525",
                  borderRadius: 16, padding: 22,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <AvatarCircle initials={initials} size={40} />
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#e0e0e0" }}>{r.authorUsername}</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#555" }}>
                          {new Date(r.createdOn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <StarRow rating={r.rating} size={16} />
                  </div>

                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {editErrors.general && <p style={errStyle}>⚠️ {editErrors.general}</p>}

                      <div style={{ display: "flex", gap: 6 }}>
                        {[1, 2, 3, 4, 5].map(n => (
                          <button key={n} onClick={() => setEditForm(p => ({ ...p, rating: n }))}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, opacity: n <= editForm.rating ? 1 : 0.25, padding: 0 }}>
                            ★
                          </button>
                        ))}
                      </div>
                      {editErrors.rating && <p style={errStyle}>⚠️ {editErrors.rating}</p>}

                      <textarea
                        value={editForm.content}
                        onChange={e => setEditForm(p => ({ ...p, content: e.target.value }))}
                        rows={3}
                        style={{
                          width: "100%", background: "#1a1a1a",
                          border: `1px solid ${editErrors.content ? "#6b2d2d" : "#2a2a2a"}`,
                          borderRadius: 10, color: "#e0e0e0", fontSize: 14,
                          padding: 10, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
                        }}
                      />
                      {editErrors.content && <p style={errStyle}>⚠️ {editErrors.content}</p>}

                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => handleEditSubmit(r.id)} style={saveBtn}>Save</button>
                        <button onClick={() => setEditingId(null)} style={cancelBtn}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p style={{ margin: 0, fontSize: 14, color: "#aaa", lineHeight: 1.65 }}>{r.content}</p>
                      {isOwn && (
                        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                          <button onClick={() => startEdit(r)} style={editBtn}>Edit</button>
                          <button onClick={() => handleDelete(r.id)} style={deleteBtn}>Delete</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StarRow({ rating, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} style={{ fontSize: size, color: n <= rating ? "#f59e0b" : "#333" }}>★</span>
      ))}
    </div>
  );
}

const pageWrap = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const backBtn  = { background: "none", border: "none", color: "#4a9eff", cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "'DM Sans', sans-serif", display: "block" };
const labelStyle = { display: "block", fontSize: 13, color: "#999", marginBottom: 8, fontWeight: 500 };
const errStyle   = { margin: "4px 0 0", fontSize: 12, color: "#e07070" };
const saveBtn    = { background: "#2563eb", border: "none", color: "#fff", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" };
const cancelBtn  = { background: "none", border: "1px solid #333", color: "#aaa", borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer" };
const editBtn    = { background: "none", border: "1px solid #2a2a2a", color: "#888", borderRadius: 8, padding: "6px 16px", fontSize: 12, cursor: "pointer" };
const deleteBtn  = { background: "none", border: "1px solid #6b2d2d", color: "#e07070", borderRadius: 8, padding: "6px 16px", fontSize: 12, cursor: "pointer" };