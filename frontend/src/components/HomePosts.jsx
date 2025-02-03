import React from 'react';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center mt-8 border shadow-xl rounded-lg p-2">
      {/* Left */}
      <div className="md:w-[35%] h-[200px] flex justify-center items-center">
        <img src={post.photo} alt="" className="h-full w-full object-cover" />
      </div>
      {/* Right */}
      <div className="flex mt-2 md:ml-6 flex-col items-start md:w-[65%]">
        <h1 className="text-2xl font-bold md:mb-2 mb-1 md:text-3xl">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row mb-2 text-sm font-semibold text-gray-500 md:mb-4">
          <p className='text-lg'>@{post.name}</p>
          <div className="flex space-x-6 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{post.desc.slice(0, 200) + " ...Read more"}</p>
      </div>
    </div>
  );
};

export default HomePosts;
