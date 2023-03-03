import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, BoltIcon } from '@heroicons/react/24/outline'

const SuccessModal = ({ success, setSuccess }) => (
    <Transition.Root show={Boolean(success)} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setSuccess}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <CheckIcon
                                        className="h-6 w-6 text-green-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        Badge Minted. <br />
                                        <span className="text-sm text-gray-500">
                                            Airdrop successful! You can see your
                                            badge here: <br />
                                            <a
                                                target="_blank"
                                                href={success}
                                                rel="noreferrer"
                                            >
                                                {success}
                                            </a>
                                        </span>
                                    </Dialog.Title>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
)

const LoadingModal = ({ loading, setLoading }) => (
    <Transition.Root show={loading} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setLoading}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-12">
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                                    <BoltIcon
                                        className="h-6 w-6 text-yellow-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        Crafting you a new badge. One moment.
                                    </Dialog.Title>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
)

const App = () => {
    const [value, setValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    console.log('🚀 ~ App ~ success:', success)

    const handleMint = async () => {
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('http://localhost:3000/mint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: value,
                }),
            })
            const data = await res.json()
            console.log('🚀 ~ handleMint ~ data:', data)

            if (data?.successMessage?.code === 'UNCONFIGURED_NAME') {
                setError('bad address')
                setLoading(false)
                return
            }
            if (data.error) {
                setError(data.error)
                setLoading(false)
                return
            }
            setSuccess(data.successMessage)
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError(err)
        }
    }

    return (
        <div
            className="relative h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url('https://cdn.midjourney.com/2b2e5247-1acb-4615-926b-cd5bfeb43580/grid_0.png')`,
            }}
        >
            <LoadingModal loading={loading} setLoading={setLoading} />
            <SuccessModal success={success} setSuccess={setSuccess} />
            <div className="absolute inset-0 bg-gray-900 opacity-20" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-4/6">
                <form className="flex flex-col sm:flex-row items-center max-w-full mx-auto mx-4 mb-4">
                    <input
                        className="w-full border border-gray-300 rounded-lg py-6 sm:mr-4 text-center mb-4 sm:mb-0 sm:w-full"
                        type="search"
                        placeholder="Type in ETH address"
                        onChange={e => setValue(e.target.value)}
                        value={!value ? '' : value}
                    />
                    <button
                        type="button"
                        onClick={handleMint}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-2 w-60 rounded"
                    >
                        Mint NFT
                    </button>

                    {success && (
                        <div className="text-green-500 text-center">
                            Success!
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-center">{error}</div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default App
