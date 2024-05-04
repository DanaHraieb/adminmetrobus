import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import Chart from "react-apexcharts";
import axios from 'axios';

export default function Dashboard() {
    const [datacards, setDatacards] = useState({ users: 0, tickets: 0, avis: 0 });
    const [ratingSummary, setRatingSummary] = useState([]);
    const [trajetData, setTrajetData] = useState([]);
    const [optionsBar, setOptionsBar] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: []
        }
    });
    const [seriesBar, setSeriesBar] = useState([{
        name: "User Count",
        data: []
    }]);

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await axios.get(`http://localhost:5000/${url}`);
                setter(response.data);
            } catch (error) {
                console.error(`Failed to fetch data from ${url}`, error);
            }
        };
        fetchData('user/getStatsCards', setDatacards);
        fetchData('ratingavis/ratingSummary', setRatingSummary);
        fetchData('user/userDataByMonth', data => {
            const months = data.map(item => `Month ${item._id}`);
            const userCounts = data.map(item => item.numberOfUsers);
            setSeriesBar([{ name: "User Count", data: userCounts }]);
            setOptionsBar({ ...optionsBar, xaxis: { categories: months } });
        });
    }, []);

    const optionsPie = {
        labels: ['Nombre des Users', 'Nombre des Tickets', 'Nombre des Avis']
    };
    const seriesPie = [datacards.users, datacards.tickets, datacards.avis];
    const optionsRatingSummary = {
        chart: {
            type: 'bar',
            height: 344,
            toolbar: {
                show: false
            },
            animations: {
                enabled: false,
                easing: 'swing'
            },
            background: '#fff',
            foreColor: '#373D3F',
            fontFamily: 'Anton',
            zoom: {
                enabled: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 10,
                dataLabels: {
                    total: {
                        enabled: false
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -2,
            offsetY: -3,
            style: {
                fontWeight: 700,
                colors: ['#fff']
            }
        },
        grid: {
            padding: {
                right: 25,
                left: 15
            }
        },
        xaxis: {
            categories: ['5 étoiles', '4 étoiles', '3 étoiles', '2 étoiles', '1 étoile'],
            title: {
                text: "Nombre d'utilisateur",
                style: {
                    fontWeight: 700
                }
            }
        },
        yaxis: {
            tickAmount: 5,
            title: {
                text: "Nombre d'étoile",
                style: {
                    fontSize: 12,
                    fontWeight: 700
                }
            }
        },
        stroke: {
            show: true,
            fill: {
                type: 'solid',
                opacity: 0.85
            }
        },
        tooltip: {
            intersect: true
        },
        colors: ['#C50C0C', '#E46B07', '#F7E307', '#7FF707', '#60BE01']
    };

    const seriesRatingSummary = [{
        name: 'Bar',
        data: ratingSummary.map(item => ({
            x: `${item.rating} étoiles`, // Make sure this label matches your categories
            y: item.count,
            fillColor: getColorForRating(item.rating) // Assign color based on rating
        }))
    }];

    function getColorForRating(rating) {
        const colors = ['#C50C0C', '#E46B07', '#F7E307', '#7FF707', '#60BE01']; // Colors for 1-5 stars
        return colors[rating - 1]; // Adjust index for 0-based array
    }


    const getTrajetSeries = () => {
        return [{
            name: 'Reservations',
            data: trajetData.map(trajet => trajet.count)
        }];
    };

    const optionsTrajet = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: trajetData.map(trajet => trajet.name)
        },
        title: {
            text: 'Most Reserved Routes',
            align: 'center'
        },
        yaxis: {
            title: {
                text: 'Number of Reservations'
            }
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <h1>Tableau de bord</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <img src='/image/user.png' alt='Users' />
                                </div>
                                <div className='col-sm-9'>
                                    <h6>Nombre des utilisateurs</h6>
                                    <div>{datacards?.users} users</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <img src='/image/ticket.png' alt='Tickets' />
                                </div>
                                <div className='col-sm-9'>
                                    <h6>Nombre des tickets</h6>
                                    <div>{datacards ? datacards.tickets : "loading"} tickets</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <img src='/image/rate.png' alt='Reviews' />
                                </div>
                                <div className='col-sm-9'>
                                    <h6>Nombre des avis</h6>
                                    <div>{datacards ? datacards.avis + " avis" : "loading"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Chart
                            options={optionsBar}
                            series={seriesBar}
                            type='bar'
                            width="500"
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Chart
                            options={optionsPie}
                            series={seriesPie}
                            type="donut"
                            width="500"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Chart
                            options={optionsRatingSummary}
                            series={seriesRatingSummary}
                            type="bar"
                            height="500"
                        />
                        <h2>Customer Satisfaction Rating</h2>
                    </div>
                    <div className='col-sm-6'>
                        <Chart
                            options={optionsTrajet}
                            series={getTrajetSeries()}
                            type="bar"
                            height="500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
