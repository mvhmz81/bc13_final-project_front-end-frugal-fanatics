import React, { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Modal from "react-modal";
import { Chart as ChartJS, ArcElement, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { savingsOptions } from "../../data/charts";
import TotalSavings from "../TotalSavings";
ChartJS.register(ArcElement);
import baby from "/public/baby.png";
import Confetti from "react-confetti";

const nurseryPot = [
	{
		label: "Nursery",
		total: 1200,
		goal: 5000,
		img: baby,
		width: 98,
		height: 82,
		alt: "A cartoon baby bottle and baby grow",
		color: "#B884FF",
	},
];

const NurseryPot = ({}) => {
	// state to keep track of the current progress and goal
	const [progress, setProgress] = useState(nurseryPot[0].total);
	const [goal, setGoal] = useState(nurseryPot[0].goal);
	// state to keep track of remainder
	const [remainder, setRemainder] = useState(goal - progress);
	// state to keep track of whether the modal is open or closed
	const [modalIsOpen, setModalIsOpen] = useState(false);
	// state to keep track of when confetti is being used
	const [showConfetti, setShowConfetti] = useState(false);
	// state to keep track of the chart data
	const [nurseryDonutData, setnurseryDonutData] = useState({
		labels: ["total", "goal"],
		datasets: [
			{
				label: "Nursey",
				data: [progress, remainder],
				backgroundColor: ["#B884FF", "#3D4767"],
				hoverOffset: 0,
				responsive: true,
				maintainAspectRatio: true,
				borderWidth: 0,
			},
		],
	});
	// function to open the modal
	const openModal = () => {
		setModalIsOpen(true);
	};
	// function to close the modal
	const closeModal = () => {
		setModalIsOpen(false);
	};
	// useEffect to timeout the confetti after 5 seconds
	useEffect(() => {
		if (showConfetti) {
			setTimeout(() => {
				setShowConfetti(false);
			}, 5000);
		}
	}, [showConfetti]);

	// function to handle the form submission and only show confetti if the progress goes up
	const handleSubmit = (event) => {
		event.preventDefault();
		const newProgress = event.target.progress.value;
		setGoal(event.target.goal.value);
		if (newProgress > progress) {
			setProgress(newProgress);
			setShowConfetti(true);
		} else {
			setProgress(newProgress);
		}
		closeModal();
	};

	/*  const nurseryTotal = nurseryPot[0].total
  const nurseryGoal = nurseryPot[0].goal
 */
	useEffect(() => {
		setProgress;
		setRemainder(goal - progress);
		setnurseryDonutData({
			labels: ["goal", "total"],
			datasets: [
				{
					label: "Nursery",
					data: [progress, remainder],
					backgroundColor: ["#B884FF", "#3D4767"],
					hoverOffset: 0,
					responsive: true,
					maintainAspectRatio: true,
					borderWidth: 0,
				},
			],
		});
	}, [progress, remainder]);

	return (
		<div className="flex flex-col items-center gap-5 ">
			<div className="relative h-[180px] w-[180px]">
				<div className="absolute left-1/2 top-1/2 h-full w-full translate-y-[-50%] translate-x-[-50%]">
					<Doughnut data={nurseryDonutData} options={savingsOptions} />
				</div>
				<div className="absolute top-1/4 left-1/4">
					<Image
						src={nurseryPot[0].img}
						alt="A cartoon present with blue ribbons"
						width={nurseryPot[0].width}
						height={nurseryPot[0].height}
					/>
				</div>
			</div>
			<h3 className="mb-[-7px] text-xl font-medium text-[#EDEDEE]">
				{nurseryPot[0].label}
			</h3>
			<div className="flex flex-col items-center gap-3">
				<p className="font-light tracking-wide text-[#EDEDEE]">
					Current: £{progress}
				</p>
				<p className="font-light tracking-wide text-[#EDEDEE]">Goal: £{goal}</p>
			</div>
			<button
				className="flex items-center gap-2 rounded-lg py-2.5 pr-6 pl-4"
				color={nurseryPot[0].color}
				onClick={openModal}
			>
				<PlusCircleIcon className="h-5.5 w-6" color={nurseryPot[0].color} />
				<p className="text-base tracking-wide text-[#EDEDEE]"> Add Savings </p>
			</button>
			<div>
				{showConfetti && <Confetti />}
				<Modal
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
				>
					<div classname="flex py-6 px-6 lg:px-8">
						<div className="flex flex-row justify-between">
							<div
								className="mb-2 text-left text-xl font-medium text-[#212637]"
								style={{ fontFamily: "Shapiro Welter Wide" }}
							>
								Add to your pot
							</div>
							<button
								className="flex justify-end pr-2 text-xl text-[#212637] hover:border-[#4E29AA] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								style={{ fontFamily: "Shapiro Welter Wide" }}
								onClick={closeModal}
							>
								X
							</button>
						</div>
						<form
							className="rounded-lg bg-[#212637] py-5 px-4"
							onSubmit={handleSubmit}
						>
							<label
								className="px-1 pb-2 text-[22px] text-[#EDEDEE]"
								style={{ fontFamily: "Shapiro Welter Wide" }}
							>
								Current:
								<input
									className="block h-[50px] w-full rounded-lg border-0 bg-[#37345B] pl-6 pr-4 text-xl placeholder:font-medium placeholder:text-[#646A7E] focus:ring-2 focus:ring-indigo-500"
									type="number"
									name="progress"
									defaultValue={progress}
									style={{ fontFamily: "Shapiro Welter Wide" }}
								/>
							</label>
							<label
								className="mt-10 text-[22px] text-[#EDEDEE]"
								style={{ fontFamily: "Shapiro Welter Wide" }}
							>
								Goal:
								<input
									className="block h-[50px] w-full rounded-lg border-0 bg-[#37345B] pl-6 pr-4 pt-3 text-xl placeholder:font-medium placeholder:text-[#646A7E] focus:ring-2 focus:ring-indigo-500"
									type="number"
									name="goal"
									defaultValue={goal}
									style={{ fontFamily: "Shapiro Welter Wide" }}
								/>
							</label>
							<button
								className="mt-4 inline-flex items-center justify-center rounded-lg border-2 border-[#282E43] bg-[#37345B] px-5 py-2 font-sans text-lg font-medium tracking-wide text-white transition-colors hover:border-[#4E29AA] hover:bg-[#4E29AA] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								type="submit"
								style={{ fontFamily: "Shapiro Welter Wide" }}
							>
								Save
							</button>
						</form>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default NurseryPot;
