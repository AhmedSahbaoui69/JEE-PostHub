import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { MdDateRange, MdPostAdd, MdOutlineSearch } from "react-icons/md";
import { FaRegUserCircle, FaSort } from "react-icons/fa"
import { RiShieldUserLine } from "react-icons/ri";
import {Button, Dropdown, Spinner} from "flowbite-react";
import Post from "../components/Post";


function CommunityPage() {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const token = localStorage.getItem('token');
    if (!token) {
        window.location='/login';
    }

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/community/${id}`);
                setCommunity(response.data);
            } catch (error) {
                console.error('Failed to fetch community', error);
            }
        };

        const checkFollowStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/community/${id}/isFollowed`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setIsFollowed(response.data);
            } catch (error) {
                console.error('Failed to fetch follow status', error);
            }
        };

        fetchCommunity();
        checkFollowStatus();
    }, [id]);

    const handleFollowUnfollow = async () => {
        try {
            await axios.post(`http://localhost:8080/api/community/${id}/toggleFollow`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setIsFollowed(!isFollowed);
        } catch (error) {
            console.error('Failed to update follow status', error);
        }
    };

    if (!community) {
        return <div className="flex text-center justify-center items-center h-screen w-screen">
            <Spinner className="h-1/2 w-1/2"/>
        </div>
    }

    return (
        <div
            className="flex flex-col md:flex-row-reverse items-center md:h-full my-2 overflow-y-scroll md:overflow-hidden  animate-slide-in-bottom">
            <div
                className="duration-300 delay-0 mx-2 flex md:h-full flex-2 flex-col p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-90 w-full md:w-auto">
                <div className="flex flex-row items-center justify-between  h-12">
                    <h2 className=" text-4xl h-12 font-extrabold dark:text-white">{community.name}</h2>
                    <Button className="ml-4 p-0" gradientMonochrome="teal" pill onClick={handleFollowUnfollow}>
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </Button>
                </div>

                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">  {community.description}</p>

                <div className="max-h-[400px] max-w-[400px] flex justify-center mt-4 border border-gray-200 rounded-lg">
                    <img src={`data:image/jpeg;base64,${community.image}`} alt="Community Image"
                         className="object-cover w-full h-full rounded-lg"/>
                </div>

                <div className="mt-4 flex flex-row items-center h-12">
                    <MdDateRange className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mr-2"/>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Created at <b>{community.createdDate.split("T")[0].replace(/-/g, "/")}</b>
                    </p>
                </div>

                <div className="flex flex-row items-center h-12">
                    <FaRegUserCircle
                        className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mr-2"/>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Total members: {community.followerCount}
                    </p>
                </div>

                <div className="flex flex-row items-center h-12">
                    <MdPostAdd className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mr-2"/>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Total posts: {community.postCount}
                    </p>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                <div className="flex flex-row items-center h-12">
                    <RiShieldUserLine className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mr-2"/>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Creator: {community.creator}
                    </p>
                </div>

            </div>

            <div
                className="duration-300 delay-0 pb-4 ml:0 md:ml-2 md:h-full flex-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-90 w-full md:w-auto  overflow-hidden"
            >
                <div
                    className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 px-6 py-6">
                <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <MdOutlineSearch
                                        className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mr-2"/>
                                </div>
                                <input type="text" id="simple-search"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Search" required=""/>
                            </div>
                        </form>
                    </div>
                    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <Button>
                        <FaSort className="mr-2 h-5 w-5"/>
                        Sort
                    </Button>}>
                        <Dropdown.Item>By date</Dropdown.Item>
                        <Dropdown.Item>By votes</Dropdown.Item>
                    </Dropdown>
                </div>

                <div className="w-full h-screen overflow-y-scroll px-6 ">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;