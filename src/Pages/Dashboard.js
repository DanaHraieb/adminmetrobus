import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import Chart from "react-apexcharts";
import axios from 'axios';

export default function Dashboard() {
    const [datacards, setDatacards] = useState({});
    const [ratingSummary, setRatingSummary] = useState([]);
    const [trajetData, setTrajetData] = useState([]);
    const [userCount, setUserCount] = useState({});
    const [topBusTrajet, setTopBusTrajet] = useState({});
    const [topMetroTrajet, setTopMetroTrajet] = useState({});
    const token = localStorage.getItem('token');

    const [ticketCount, setTicketCount] = useState({});
    const [clientSatist, setClientSatist] = useState({})


    useEffect(() => {

        const getStatCards = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/getStatsCards', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setDatacards(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        const getUserPerMonth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/userDataByMonth', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setUserCount(res.data);
                console.log('userCount', userCount)

            } catch (error) {
                console.log(error);
            }
        }
        const getTicketByDay = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/getTicketByDay', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setTicketCount(res.data);
                console.log('ticketCount', ticketCount)

            } catch (error) {
                console.log(error);
            }
        }
        const getRatingCount = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/getRatingCount', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setRatingSummary(res.data);


            } catch (error) {
                console.log(error);
            }
        }
        const getUserSatisfaction = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/getUserSatisfaction', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setClientSatist(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        const getTopBusTrajet = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/getTopTrajetByBus/bus', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setTopBusTrajet(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        const getTopMetroTrajet = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/getTopTrajetByBus/metro', { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setTopMetroTrajet(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getStatCards();
        getUserPerMonth();
        getRatingCount();
        getUserSatisfaction();
        getTicketByDay();
        getTopBusTrajet();
        getTopMetroTrajet();
    }, [])



    const series = [{
        name: 'nouveau utilisateur',
        data: Array.isArray(userCount) ? userCount.map((item) => item.numberOfUsers) : []

    }]


    const options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        title: {
            text: 'Nombre d\'utilisateurs par mois',  // Titre du graphiqu
            align: 'center',  // Centrage du titre
            margin: 10,  // Marge au-dessus du titre
            floating: false,  // Définit si le titre doit flotter au-dessus du graphique
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],

            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },

                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            title: {
                text: "Nombre d'utilisateur",
                style: {
                    fontWeight: 700
                }
            }

        },

    }

    const seriesTicket = [{
        name: 'Tickets réservée',
        data: Array.isArray(ticketCount) ? ticketCount.map((item) => item.numberOfTickets) : []
    }]
    const optionsTicket = {
        chart: {
            type: 'bar',
            height: 350
        },
        title: {
            text: 'Tickets Réservés par Jour',
            align: 'center',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        },
        yaxis: {
            title: {
                text: "Total tickets reservés",
                style: {
                    fontWeight: 700
                }
            }
        },
        fill: {
            opacity: 1
        },

    }






    const optionsPie = {
        labels: ['client satisfait', 'client non satisfait'],
        title: {
            text: 'Satisfaction des clients',
            align: 'center',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
    };

    const seriesPie = [clientSatist?.satisfiedUsers || 0, clientSatist?.dissatisfiedUsers || 0];


    function getColorForRating(rating) {
        const colors = ['#C50C0C', '#E46B07', '#F7E307', '#7FF707', '#60BE01']; // Colors for 1-5 stars
        return colors[rating - 1]; // Adjust index for 0-based array
    }




    const optionsRatingSummary = {
        chart: {
            type: 'bar',
            height: 100,
            toolbar: {
                show: false
            },

            animations: {
                enabled: false,
                easing: 'swing'
            },
            background: '#fff',
            foreColor: '#373D3F',
            zoom: {
                enabled: false
            },
        },
        title: {
            text: 'Distribution des notes des utilisateurs ',
            align: 'center',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
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
            categories: ['1 étoiles', '2 étoiles', '3 étoiles', '4 étoiles', '5 étoiles'],
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
        name: 'users',
        data: ratingSummary.map(item => ({
            x: `${item.rankNumber} étoiles`,
            y: item.numberOfUsers,
            fillColor: getColorForRating(item.rankNumber)
        }))
    }];


    const seriesBus = Array.isArray(topBusTrajet) ? topBusTrajet.map((item) => item.numberOfReservations) : []
    const optionsBus = {
        chart: {
            type: 'polarArea',
        },
        title: {
            text: 'Top 3 Trajets Bus',
            align: 'center',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        stroke: {
            colors: ['#fff']
        },
        labels: Array.isArray(topBusTrajet) ? topBusTrajet.map((item) => item.trajet) : [],
        fill: {
            opacity: 0.8
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    const seriesMetro = Array.isArray(topMetroTrajet) ? topMetroTrajet.map((item) => item.numberOfReservations) : []
    const optionsMetro = {
        chart: {
            type: 'polarArea',
        },
        title: {
            text: 'Top 3 Trajets Metro',
            align: 'center',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        stroke: {
            colors: ['#fff']
        },
        labels: Array.isArray(topMetroTrajet) ? topMetroTrajet.map((item) => item.trajet) : [],
        fill: {
            opacity: 0.8
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }




    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <h1>Dashboard</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='card'>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <img src='/image/user.png' alt='Users' />
                                </div>
                                <div className='col-sm-9'>
                                    <h6>Total des utilisateurs</h6>
                                    <div>{datacards?.users} utilisateurs</div>
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
                                    <h6>Total des tickets réservés</h6>
                                    <div>{datacards?.tickets} tickets réservés</div>
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
                                    <h6>Total des avis</h6>
                                    <div>{datacards?.avis}avis</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='card'>

                            <Chart
                                options={options}
                                series={series}
                                type='bar'
                                width="100%"
                            />
                        </div>

                    </div>
                    <div className='col-sm-6'>
                        <div className='card'>
                            <Chart
                                options={optionsTicket}
                                series={seriesTicket}
                                type="bar"
                                width="100%"
                            />
                        </div>

                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='card'>
                            <Chart
                                options={optionsRatingSummary}
                                series={seriesRatingSummary}
                                type="bar"
                                width="100%"
                            />

                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='card'>

                            <Chart
                                options={optionsPie}
                                series={seriesPie}
                                type="donut"
                                width="100%"
                            />
                        </div>

                    </div>
                    <div className='col-sm-6'>
                        <div className='card'>

                            <Chart options={optionsBus} series={seriesBus} type="polarArea" width="90%"
                            />
                        </div>

                    </div>
                    <div className='col-sm-6'>
                        <div className='card'>

                            <Chart options={optionsMetro} series={seriesMetro} type="polarArea" width="90%" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};