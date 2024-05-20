import React from 'react';
import {Avatar, Dropdown} from "flowbite-react";

function  Post ({user, date, title, content, votes}) {
    return (
        <div className="flex items-start gap-2.5 pt-8">
            <Avatar className="min-w-[40px]" alt="o" img={user && user.image ? `data:image/jpeg;base64,${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} rounded />
            <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded dark:bg-gray-700">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || "User"}</span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{date || "Date"}</span>
                </div>
                <h2 className="text-lg font-bold py-2.5 text-gray-900 dark:text-white">{title || "Title"}</h2>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{content || "Content"}</p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Votes: {votes || 0}</span>
            </div>
            <Dropdown label="" dismissOnClick={false}
                      renderTrigger={() => <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
            </button>}>
                <Dropdown.Item>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                </Dropdown.Item>
                <Dropdown.Item>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                </Dropdown.Item>
                <Dropdown.Item>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
}

export default Post;