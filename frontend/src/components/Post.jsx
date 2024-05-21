import React from 'react';
import {Avatar, Button, Dropdown} from "flowbite-react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { BsThreeDots} from "react-icons/bs";
import axios from "axios";

function  Post ({user, date, title, content, votes, postId}) {
    const handleUpvote = async () => {
        try {
            await axios.post('http://localhost:8080/api/posts/upvote', { voteType: 'UPVOTE', postId: postId }); // Use postId in the request
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownvote = async () => {
        try {
            await axios.post('http://localhost:8080/api/posts/downvote', { voteType: 'DOWNVOTE', postId: postId }); // Use postId in the request
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-start gap-2.5 pt-8">

            <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded dark:bg-gray-700">
                <div className="flex flex-row items-center justify-between">

                    <div className="flex flex-row items-center">
                        <Avatar className="min-w-[40px] mr-2" alt="o"
                                img={user && user.image ? `data:image/jpeg;base64,${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                                rounded/>
                        <div>
                            <span
                                className="text-sm font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</span>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{user.email}</p>

                        </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        }) || "Date"}
                    </span>
                    </div>

                </div>

                <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-600"/>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-sm font-normal py-2.5  text-gray-500 dark:text-gray-400">{content}</p>

                <div className="flex flex-row items-center">
                    <Button className="p-0 w-9" color="success" pill onClick={handleUpvote}>
                        <BiSolidUpvote/>
                    </Button>
                    <Button className="mx-2 p-0 w-9" color="failure" pill onClick={handleDownvote}>
                        <BiSolidDownvote/>
                    </Button>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{votes || 0} votes</span>
                </div>

                <div>
                    <Dropdown label="" dismissOnClick={false}
                              renderTrigger={() => <button id="dropdownMenuIconButton"
                                                           data-dropdown-toggle="dropdownDots"
                                                           data-dropdown-placement="bottom-start"
                                                           className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                                                           type="button">
                                  <BsThreeDots/>
                              </button>}>
                        <Dropdown.Item>
                            <a href="#"
                               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a href="#"
                               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a href="#"
                               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
</div>
);
}

export default Post;