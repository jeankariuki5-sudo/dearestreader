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
        if (!storedUser) { navigate("/signin"); return; }
        const currentUserEmail = JSON.parse(storedUser).email;
        if (!ADMIN_EMAILS.includes(currentUserEmail)) navigate("/");
    }, [navigate]);

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost]               = useState("");
    const [photo, setPhoto]             = useState(null);
    const [pdf, setPdf]                 = useState(null);
    const [category, setCategory]       = useState("available");
    const [genre, setGenre]             = useState("General");
    const [author, setAuthor]           = useState("");

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
            formdata.append("genre",               genre);
            formdata.append("author",              author);
            if (pdf) formdata.append("product_pdf", pdf);

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
            setAuthor("")
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
        <div className='all'>
            <div className='wrapper'>
                <h1>Add a Book</h1>

                <center>{loading && <Loader />}</center>
                {success && <div className="feedback-success">{success}</div>}
                {error   && <div className="feedback-error">{error}</div>}

                <form onSubmit={handleSubmit}>

                    {/* Book Name */}
                    <div className="field-group">
                        <label className="field-label">Book Title</label>
                        <input
                            className="field-input"
                            type="text"
                            placeholder="e.g. The Great Gatsby"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                     {/* Author */}
                    <div className="field-group">
                        <label className="field-label">Author</label>
                        <input
                            className="field-input"
                            type="text"
                            placeholder="e.g. Shakespear"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="field-group">
                        <label className="field-label">Description</label>
                        <textarea
                            className="field-input"
                            placeholder="A short summary of the book…"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Cost */}
                    <div className="field-group">
                        <label className="field-label">Price (KES)</label>
                        <input
                            className="field-input"
                            type="number"
                            placeholder="e.g. 850"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            min="0"
                            required
                        />
                    </div>

                    {/* Genre */}
                    <div className="field-group">
                        <label className="field-label">Genre</label>
                        <select
                            className="field-select"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        >
                            {GENRES.map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category — radio toggle buttons */}
                    <div className="field-group">
                        <label className="field-label">Add book to</label>
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="cat-available"
                                name="category"
                                value="available"
                                checked={category === "available"}
                                onChange={() => setCategory("available")}
                            />
                            <label className="radio-pill" htmlFor="cat-available">
                                📖 Available Books
                            </label>

                            <input
                                type="radio"
                                id="cat-new"
                                name="category"
                                value="new_release"
                                checked={category === "new_release"}
                                onChange={() => setCategory("new_release")}
                            />
                            <label className="radio-pill" htmlFor="cat-new">
                                🆕 New Releases
                            </label>
                        </div>
                    </div>

                    {/* Cover image */}
                    <div className="field-group">
                        <label className="field-label">Cover Image</label>
                        <div className="file-upload-box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                required
                            />
                            {photo && <p className="file-chosen">✅ {photo.name}</p>}
                        </div>
                    </div>

                    {/* PDF (optional) */}
                    <div className="field-group">
                        <label className="field-label">Book PDF <span style={{ textTransform: 'none', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}> — optional, makes it a free e-book</span></label>
                        <div className="file-upload-box">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                            />
                            {pdf
                                ? <p className="file-chosen">✅ {pdf.name}</p>
                                : <p className="file-hint">5 free downloads/day limit will apply</p>
                            }
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Adding…" : "Add Book"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Addproducts;
