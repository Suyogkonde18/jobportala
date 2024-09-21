import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState("");
    const [jobs, setJobs] = useState([]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!title || !company || !location || !description || !salary) {
            toast.error('Please fill all fields to post a job.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/api/jobs',
                { title, company, location, description, salary }
            );

            if (response.status === 201) {
                toast.success('Job added successfully!');
                setTitle("");
                setCompany("");
                setLocation("");
                setDescription("");
                setSalary("");

                axios.get('http://localhost:3001/api/jobs')
                    .then(response => setJobs(response.data))
                    .catch(err => console.log(err));
            }
        } catch (error) {
            console.error('Error adding job:', error);
            toast.error('Failed to add job. Please try again.');
        }
    };

    // Inline styles
    const styles = {
        form: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            border: '1px solid hsl(0, 0%, 80%)',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            marginTop: '100px'
        },
        formDiv: {
            marginBottom: '15px'
        },
        formLabel: {
            display: 'block',
            marginBottom: '5px'
        },
        formInput: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px'
        },
        formTextarea: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            height: '100px'
        },
        formButton: {
            backgroundColor: '#46812a',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
        },
        formButtonHover: {
            backgroundColor: '#fff',
            color: '#3a6e1d',
            border: '2px solid #3a6e1d'
        }
    };

    return (
        <div>
            <header>
                <h1>Job Search Portal</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">PostJobS</a></li>
                </ul>
            </nav>
            <form onSubmit={handleOnSubmit} style={styles.form}>
                <div style={styles.formDiv}>
                    <label style={styles.formLabel}>Title:</label>
                    <input
                        type="text"
                        placeholder="Job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.formInput} />
                </div>
                <div style={styles.formDiv}>
                    <label style={styles.formLabel}>Company:</label>
                    <input
                        type="text"
                        placeholder="Company Name..."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        style={styles.formInput} />
                </div>
                <div style={styles.formDiv}>
                    <label style={styles.formLabel}>Location:</label>
                    <input
                        type="text"
                        placeholder="Company Location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={styles.formInput} />
                </div>
                <div style={styles.formDiv}>
                    <label style={styles.formLabel}>Description:</label>
                    <input
                        type="text"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.formInput} />
                </div>
                <div style={styles.formDiv}>
                    <label style={styles.formLabel}>Salary:</label>
                    <input
                        type="number"
                        placeholder="Salary..."
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        style={styles.formInput} />
                </div>
                <button type="submit" style={styles.formButton}>Submit</button>
            </form>
        </div>
    );
};

export default PostJob;
