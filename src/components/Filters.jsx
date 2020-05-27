import React from 'react';

import './filters.scss';

class Filters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
		};
	}

	handleChange(e) {
		const { onChange } = this.props;
		const { value } = e.target || '';

		this.setState({ value });

		onChange(value);
	}

	render() {
		const { value } = this.state;
		const { handleSort, filterSelected } = this.props;

		return (
			<div className="container" data-testid="filters">
				<section className="filters">
					<div className="filters__search">
						<input
							type="text"
							className="filters__search__input"
							placeholder="Pesquisar"
							value={value || ''}
							onChange={(e) => this.handleChange(e)}
						/>

						<button className="filters__search__icon">
							<i className="fa fa-search"/>
						</button>
					</div>

					<button className={`filters__item ${filterSelected === 'name' && 'is-selected'}`} onClick={() => handleSort('name')}>
						Nome <i className="fas fa-sort-down" />
					</button>

					<button className={`filters__item ${filterSelected === 'country' && 'is-selected'}`} onClick={() => handleSort('country')}>
						País <i className="fas fa-sort-down" />
					</button>

					<button className={`filters__item ${filterSelected === 'company' && 'is-selected'}`} onClick={() => handleSort('company')}>
						Empresa <i className="fas fa-sort-down" />
					</button>

					<button className={`filters__item ${filterSelected === 'department' && 'is-selected'}`} onClick={() => handleSort('department')}>
						Departamento <i className="fas fa-sort-down" />
					</button>

					<button className={`filters__item ${filterSelected === 'admissionDate' && 'is-selected'}`} onClick={() => handleSort('admissionDate')}>
						Data de admissão <i className="fas fa-sort-down" />
					</button>
				</section>
			</div>
		);
	}
}

export default Filters;
