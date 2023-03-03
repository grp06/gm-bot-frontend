import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import sponsors from '../assets/sponsors.json'
import Header from '../components/Header'

const stats = [
    { id: 1, name: 'Sponsors at ETH Denver', value: '178' },
    { id: 2, name: 'Prizes', value: '328' },
    { id: 3, name: 'Prize moeny to win', value: '$1.2 million' },
    { id: 4, name: 'Paid out to creators', value: '$70M' },
]

function Home() {
    console.log('message here')
    return (
        <div className="w-full">
            <Header />
            <div className="w-10/12 mx-auto">
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                        <div className="bg-white sm:py-4">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:max-w-none">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                            ETH Denver Sponsors and doc Explorer
                                        </h2>
                                    </div>
                                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                                        {stats.map(stat => (
                                            <div
                                                key={stat.id}
                                                className="flex flex-col bg-gray-400/5 p-8"
                                            >
                                                <dt className="text-sm font-semibold leading-6 text-gray-600">
                                                    {stat.name}
                                                </dt>
                                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                                                    {stat.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {sponsors.map(sponsor => (
                                <a key={sponsor.id} href={sponsor.name}>
                                    <img
                                        className="mx-auto h-24 w-24 rounded-full"
                                        src={sponsor.logoUrl}
                                        alt=""
                                    />
                                    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                                        {sponsor.name}
                                    </h3>
                                    <p className="text-sm leading-6 text-gray-600">
                                        6 prizes
                                    </p>
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
