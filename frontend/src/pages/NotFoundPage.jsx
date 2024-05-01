import React from 'react';
import errorImage from '../logo.svg';
import {Button, Card} from "flowbite-react";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className='flex justify-center py-10 px-5'>
            <Card className='w-auto h-max-fill px-10 py-10'>
                <img src={errorImage} alt='Agriculture Icon' width={"256px"} height={"256px"} className='m-auto'/>
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-8xl text-blue-600">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Page
                        not found.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we couldn't
                        find this page.</p>
                    <center><Button><Link to="/">Return to the homepage</Link></Button></center>
                </div>
            </Card>
        </div>
    );
}

export default NotFoundPage;