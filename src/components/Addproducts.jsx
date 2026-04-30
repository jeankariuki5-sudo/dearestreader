import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Addproducts.css'
import { ADMIN_EMAILS, ADMIN_TOKEN } from '../config';

const GENRES = [
    "Fiction",
    "Non-Fiction",
    "Mystery & Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Biography & Memoir",
    "Self-Help",
    "History",
    "Children's",
    "Young Adult",
    "Horror",
    "Poetry",
    "Business",
    "Science",
    "Travel",
    "General",
];

const Addproducts = () => {
    const navigate = useNavigate();

    // Admin-only guard
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/signin");
            return;
        }
        const currentUserEmail = JSON.parse(storedUser).email;
        if (!ADMIN_EMAILS.includes(currentUserEmail)) {
            navigate("/");
        }
    }, [navigate]);

    const [productName, setProductName]   = useState("");
    const [description, setDescription]   = useState("");
    const [cost, setCost]                 = useState("");
    const [photo, setPhoto]               = useState(null);
    const [pdf, setPdf]                   = useState(null);
    const [category, setCategory]         = useState("available");
    const [genre, setGenre]               = useState("General"); // NEW

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError]     = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const formdata = new FormData();
            formdata.append("product_name",        productName);
            formdata.append("product_description", description);
            formdata.append("product_cost",        cost);
            formdata.append("product_photo",       photo);
            formdata.append("product_category",    category);
            formdata.append("genre",               genre); // NEW
            formdata.append("author",              ""); // required by backend INSERT
            if (pdf) {
                formdata.append("product_pdf", pdf);
            }

            const response = await axios.post(
                'https://jeankariuki.alwaysdata.net/api/add_product',
                formdata,
                { headers: { Authorization: `Bearer ${ADMIN_TOKEN}` } }
            );

            setLoading(false);
            setSuccess(response.data.message);

            setProductName("");
            setDescription("");
            setCost("");
            setPhoto(null);
            setPdf(null);
            setCategory("available");
            setGenre("General");
            e.target.reset();

            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            setLoading(false);
            const msg = err.response?.data?.error || "Something went wrong. Please try again.";
            setError(msg);
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <div className='row justify-content-center mt-4 all'>
            <div className='card col-md-6 shadow p-4 wrapper'>
                <h1 className='text-light'>Add a Book</h1>

                <center>{loading && <Loader />}</center>
                <h5 className="text-success">{success}</h5>
                <h5 className="text-danger">{error}</h5>

                <form onSubmit={handleSubmit}>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Enter the book name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Enter the book description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="number"
                            placeholder='Enter the book cost (KES)'
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            min="0"
                            required
                        />
                    </div>

                    {/* ── Genre selector (NEW) ─────────────────────────── */}
                    <div className="input-box">
                        <label className="file-label">🏷️ Genre</label>
                        <select
                            className="genre-select"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        >
                            {GENRES.map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    {/* ── Category (physical / new release) ───────────── */}
                    <div className="category-box">
                        <label className="file-label">📚 Add book to:</label>
                        <div className="category-options">
                            <label
                                className={`category-pill ${category === "available" ? "active" : ""}`}
                                onClick={() => setCategory("available")}
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value="available"
                                    checked={category === "available"}
                                    onChange={() => setCategory("available")}
                                />
                                📖 Available Books
                            </label>

                            <label
                                className={`category-pill ${category === "new_release" ? "active" : ""}`}
                                onClick={() => setCategory("new_release")}
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value="new_release"
                                    checked={category === "new_release"}
                                    onChange={() => setCategory("new_release")}
                                />
                                🆕 New Releases
                            </label>
                        </div>
                    </div>

                    {/* ── Cover image ───────────────────────────────────── */}
                    <div className="input-box file-box">
                        <label className="file-label">📷 Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                        />
                    </div>

                    {/* ── PDF — if uploaded this becomes a free e-book ─── */}
                    <div className="input-box file-box">
                        <label className="file-label">
                            📄 Book PDF{" "}
                            <span className="optional-tag">
                                (upload to offer as a free e-book · 5 downloads/day limit)
                            </span>
                        </label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setPdf(e.target.files[0])}
                        />
                        {pdf && <p className="file-name">✅ {pdf.name}</p>}
                    </div>

                    <input
                        type="submit"
                        value={loading ? "Adding..." : "Add Book"}
                        className='btn'
                        disabled={loading}
                    />

                </form>
            </div>
        </div>
    );
};

export default Addproducts;
