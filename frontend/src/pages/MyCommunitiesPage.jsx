import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet-async";
import {Button, Card} from "flowbite-react";
import {IoMdCheckmark} from "react-icons/io";
import {FiTrash2} from "react-icons/fi";

function MyCommunitiesPage() {
    const [communities, setCommunities] = useState([]);
    const token = localStorage.getItem('token');
    const [alerts, setAlerts] = useState([]);

    if (!token) {
        window.location='/login';
    }

    const fetchCommunities = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/community/created`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCommunities(response.data);
        } catch (error) {
            console.error('Failed to fetch communities', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/community/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCommunities(communities.filter(community => community.id !== id));
            setAlerts([{ type: 'success', message: 'Community deleted successfully'}]);
        } catch (error) {
            console.error('Failed to delete community', error);
            setAlerts([{ type: 'failure', message: 'Failed to delete community'}]);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, [token]);

    if (!token) {
        window.location='/feed';
    }


    return (
        <div className="flex items-center justify-center p-4 ">
            <Helmet>
                <title>My Communities - Foorum</title>
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-in-bottom">
                {communities.map((community) => (
                    <Card href={`/community/${community.id}`} key={community.id}
                          className="h-fit transition ease-in-out duration-300 delay-0" title={community.name}>
                        <div className="flex flex-row items-center justify-between  h-12">
                            <h2 className=" text-4xl h-12 font-extrabold dark:text-white">{community.name}</h2>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                handleDelete(community.id);
                            }}>
                                <Button className="p-0 w-10" gradientMonochrome="failure" pill type="submit">
                                    <FiTrash2 className="w-5 h-5"/>
                                </Button>
                            </form>
                        </div>
                        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{community.description}</p>
                        <div
                            className="max-h-[200px] max-w-[400px] flex justify-center mt-4 border border-gray-200 rounded-lg">
                            <img src={`data:image/jpeg;base64,${community.image}`} alt="Community Image"
                                 className="object-cover w-full rounded-lg"/>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MyCommunitiesPage;