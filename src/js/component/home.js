import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let [frases, setFrase] = useState([]);

	let [tarea, setTarea] = useState("");

	const updatedtoDo = frases.map((listItems, i) => {
		return (
			<div key={i}>
				<li className="li">{listItems.label}</li>
				<button onClick={e => deleteToDo(i)}>X</button>
			</div>
		);
	});

	let lista = <ul className="list-group m-5">{updatedtoDo}</ul>;

	function handleChange(k) {
		if (k.keyCode === 13) {
			setFrase([...frases, { label: tarea, done: false }]);
			console.log(frases);
			actualizar(frases);
		}
	}
	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		console.log("Entro a get List");
		let fetchUrl =
			"https://assets.breatheco.de/apis/fake/todos/user/aaroncalero3";

		await fetch(fetchUrl)
			.then(response => response.json())
			.then(fetchBody =>
				setTarea(
					fetchBody.map(item => {
						return { label: item.label, done: item.done };
					})
				)
			)
			.catch(error => console.log("error", error));
	};
	function actualizar(frases) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(frases);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/aaroncalero2",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	function deleteToDo(i) {
		frases.splice(i, 1);
		setFrase([...frases]);
	}

	function cleanlist() {
		frases.splice(0, frases.length);
		setFrase([...frases]);
	}

	return (
		<div className="cuadro">
			<h1>Todos</h1>
			<div sytle="mt-2">
				<input
					className="entrada"
					type="text"
					onChange={e => setTarea(e.target.value)}
					onKeyUp={k => handleChange(k)}
					value={tarea}
					required
				/>
				<div className="listas">{lista}</div>
				<button className="cleanlist" onClick={e => cleanlist()}>
					Clean List
				</button>
			</div>
			<section> tienes {frases.length} tareas por completar </section>
		</div>
	);
}
