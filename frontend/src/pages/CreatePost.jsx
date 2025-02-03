import { ImCross } from 'react-icons/im';
import { useState } from 'react';
import { URL } from '../url.js'; // The URL to the backend API
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useAuthStore();
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  // Delete category
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Fix: Remove only the selected category
    setCats(updatedCats);
  };

  // Add category
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat('');
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      name: user.name,
      userId: user._id,
      categories: cats,
    };
  
    // Check if there's a file to upload
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename; // Temporarily set the filename
  
      try {
        // Upload the image to Cloudinary
        const imgUpload = await axios.post(`${URL}/upload`, data);
        console.log(imgUpload.data); // Ensure imgUpload.data contains the correct URL
        post.photo = imgUpload.data.url; // Use the Cloudinary URL returned by the backend
      } catch (err) {
        console.log(err);
      }
    }
  
    // Create the post with the photo URL
    try {
      const res = await axios.post(`${URL}/posts/create`, post, { withCredentials: true });
      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          {/* Title Input */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />

          {/* File Input */}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
          />

          {/* Categories */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* Display selected categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Description Input */}
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
          />

          {/* Submit Button */}
          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
