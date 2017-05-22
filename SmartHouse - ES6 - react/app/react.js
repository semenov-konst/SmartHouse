import React from "react";
import ReactDOM from "react-dom";

export class Rows extends React.Component { //Строкаи таблицы устройств
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.item,
			text: this.props.text,
		};
		
	}
	render() {
		return (
			<td style = {{}}>
			<center><div id={this.state.item}>{this.state.text}</div></center>
			</td>
			);
	}
	
}
export class Table extends React.Component { //Таблицы устройств
	constructor(props) {
		super(props);
		this.state = {
		};
		//debugger;
	}
	render() {
		return (
				<table  className = 'table table-striped' >
				<thead>	
				<tr>
					{this.props.items.map(
						(item, i) => <Rows key={i} item={item + '_add'} text='Кнопки добавления утройств'/>
					)}
				</tr>
				</thead>
				<tbody> 
				<tr>
					{this.props.items.map(
						(item, i) =><Rows key={i}  item={item + '_name'} text='названия'/>
					)}
				</tr>			
				<tr>
					{this.props.items.map(
						(item, i) =><Rows key={i}  item={item + '_list'} text='Список устройств пуст'/>
					)}
				</tr>
				</tbody> 	
		</table>
				);
	}

}
export class RadioButton extends React.Component { //Радиокнопка
	constructor(props) {
		super(props);
		this.state = {
			onChange: this.props.onChange,
			name: this.props.name,
			value: this.props.value,
			label: this.props.label,
			checked: this.props.checked,
			style: this.props.style
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange() {
		this.state.onChange(this.state.value);
	}
	
	componentWillMount() {
		if (this.state.checked === true) this.state.style.color = 'blue';
		if (this.state.checked === false) this.state.style.color = 'black';
	}

	render() {
		return (
			<div className="radio">
				<label style={this.state.style}>
					<input name={this.props.name} type='radio' onChange={this.onChange} value={this.state.value} checked={this.state.checked}/>
					{this.state.label}
				</label>
			</div>
			);
	}
}
RadioButton.defaultProps = {style: {color:'black'}}

export class RadioButtonList extends React.Component { //Список радиокнопок
	render() {
		//debugger;
		return (
			<form>
				{this.props.items.map(
					({value, name, onChange, label, checked}, i) => <RadioButton key = {i} 
																				value={value}
																				name={name}
																				onChange={onChange}
																				label={label}
																				checked={checked} />
				)}
			</form>
			);
	}	
}

export class Button extends React.Component { //Кнопка
	constructor(props) {
		super(props);
		this.state = 	{
			onClick: this.props.onClick,
			name: this.props.name,
			value: this.props.value,
			style: this.props.style,
			label: this.props.label,
			icon: this.props.icon
		};
		//debugger;
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.state.onClick({value:this.state.value, name:this.state.name});
	}
	render() {
		let buttonName = this.state.icon ? '' : this.state.name;
		return (
				<button type='button'  className='btn btn-info' onClick={this.onClick} value={this.state.value} style={this.state.style}><span className = {this.state.icon}></span>{buttonName}</button>
			);
	}
}


export class ControlList extends React.Component { //Список контроллеров устройств
	render() {
		//debugger;
		//console.dir(this.props.items);
		return (
			<form>
				{this.props.items.map(
					(item, i) => <ButtonGroup 
										key = {i}
										items = {item}
									/>
				)}
			</form>
			);
	}	
}

class ButtonGroup extends React.Component { //Список контроллеров устройств
	render() {
		//console.dir(this.props.items);
		//debugger;
		return (
			<div>
				<div className='btn-group'>
					{this.props.items.map(
						({value, name, onClick, style, label, icon}, i) => <Button key = {i} 
																	value={value}
																	name={name}
																	onClick={onClick}
																	style={style}
																	label={label}
																	icon={icon}
																	/>
						)}				
				</div>
				 &nbsp; {this.props.items[0].label}
				<br/>
			</div>
			);
	}	
}

export class InfoTable extends React.Component { //Информационное табло 
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text
		};
		//debugger;
	}
	componentWillReceiveProps(nextProps) {
		this.state = {
			text: nextProps.text
		};
	}

	render() {
		return (
				<textarea className='form-group' value = {this.state.text} rows="10" cols="25"  disabled></textarea>
				);
	}

}