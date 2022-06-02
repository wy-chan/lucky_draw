class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,//0-homepage 1-drawpage 2-resultpage
            mode: "number",
            pair: 0,
            min: 1,
            max: 100,
            pool: [],
            poolsave: [],
            result: [],
            current: "",
            nameList: [],
            nameInput: "",
        }
        this.makeNumPool = this.makeNumPool.bind(this);
        this.handleRangeMin = this.handleRangeMin.bind(this);
        this.handleRangeMax = this.handleRangeMax.bind(this);
        this.toPageZero = this.toPageZero.bind(this);
        this.toPageOne = this.toPageOne.bind(this);
        this.toPageOneName = this.toPageOneName.bind(this);
        this.handleDraw = this.handleDraw.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.editnumrange = this.editnumrange.bind(this);
        this.editnamerange = this.editnamerange.bind(this);
        this.editpair = this.editpair.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.addName = this.addName.bind(this);
        this.focusNewName = this.focusNewName.bind(this);
        this.delName = this.delName.bind(this);
        this.resetNamelist = this.resetNamelist.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    makeNumPool() {
        let array = (this.state.min < this.state.max) ?
            Array(this.state.max - this.state.min + 1).fill(parseInt(this.state.min)).map((x, y) => x + y) :
            Array(this.state.min - this.state.max + 1).fill(parseInt(this.state.max)).map((x, y) => x + y);
        this.setState({
            pool: array,
            poolsave: array,
        })
        console.log(array);
    }

    handleRangeMin(event) {
        this.setState({ min: event.target.value });
        console.log(event.target.value);
    }

    handleRangeMax(event) {
        this.setState({ max: event.target.value });
        console.log(event.target.value);
    }

    toPageZero() {
        this.setState({
            page: 0,
        });
        document.getElementById("home-btn").disabled = true;
    }

    toPageOne() {

        this.setState({
            page: 1,
            result: [],
            mode: "number",
        });

        this.makeNumPool();
        console.log(this.state.min);
        console.log(this.state.max);

        document.getElementById("home-btn").disabled = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    toPageOneName() {
        if(this.state.nameList.length>0){
        const newlist = this.state.nameList.map((e, i) => [i, e]);
        this.setState({
            page: 1,
            result: [],
            pool: newlist,
            poolsave: newlist,
            mode: "name",
        });
        console.log(this.state.pair);
        console.log(this.state.nameList);
        console.log(newlist);
        document.getElementById("home-btn").disabled = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }else{
        alert("Name list is empty.");
    }
    }

    handleDraw() {
        if (this.state.page == 1) {
            let random = Math.floor(Math.random() * this.state.pool.length);
            let current = this.state.pool[random];
            console.log(current);

            let newpool = [...this.state.pool];
            newpool.splice(random, 1);
            console.log(newpool);




            if (this.state.mode=="name"&& this.state.pair == 1) {
                let random1 = Math.floor(Math.random() * newpool.length);
                let current1 = newpool[random1];
                console.log(current1);

                newpool.splice(random1, 1);
                console.log(newpool);
                current = [current, current1];
                console.log(current);
            }
            let newresult = [...this.state.result];
            newresult.push(current);
            console.log(newresult);


            this.setState({
                page: 2,
                pool: newpool,
                result: newresult,
                current: current
            });
        } else {
            this.setState({
                page: 1,
            });
        }
    }

    handleReset() {
        this.setState({
            page: 1,
            result: [],
            current: "",

        });

        this.setState({
            pool: this.state.poolsave
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    editnumrange() {
        this.setState({
            page: 0,
        })
        window.scrollTo({ top: 250, behavior: 'smooth' });
    }

    editnamerange() {
        this.setState({
            page: 0,
        })
        window.scrollTo({ top: 500, behavior: 'smooth' });
    }

    editpair(event) {
        this.setState({
            pair: event.target.value,
        })
        console.log(event.target.value);
    }

    handleNameInput(event) {
        this.setState({
            nameInput: event.target.value,
        })

    }

    addName() {
        let input = this.state.nameInput;
        let newlist = [...this.state.nameList];
        if (input.length > 0) {
            newlist.push(input);
        }
        this.setState({
            nameList: newlist,
            nameInput: "",
        })
        document.getElementById("new-name").value = "";
        document.getElementById("new-name").focus();

    }

    delName(event) {
        let index = event.target.id.substr(4);
        let newlist = [...this.state.nameList];
        newlist.splice(index, 1);

        this.setState({
            nameList: newlist,
        })
    }

    focusNewName() {
        document.getElementById("new-name").focus();

    }
    resetNamelist(){
        this.setState({
            nameList:[]
        })
    }


    render() {
        return (
            <main>

                <a onClick={this.toPageZero} className={(this.state.page == 0) ? "home-btn" : "home-btn home-btn-active"} id="home-btn" title="Back to home page" disabled="disabled">
                    <h1>Lucky Draw</h1>
                </a>

                {
                    (this.state.page == 0) ?
                        <div>
                            <RandomNumbers
                                min={this.state.min}
                                max={this.state.max}
                                handleRangeMin={this.handleRangeMin}
                                handleRangeMax={this.handleRangeMax}
                                toPageOne={this.toPageOne}
                            />
                            <RandomNames
                                nameList={this.state.nameList}
                                editpair={this.editpair}
                                handleNameInput={this.handleNameInput}
                                addName={this.addName}
                                focusNewName={this.focusNewName}
                                pair={this.state.pair}
                                delName={this.delName}
                                toPageOneName={this.toPageOneName}
                                resetNamelist={this.resetNamelist}
                            />
                        </div> :
                        (this.state.mode == "number") ?
                            <div>
                                <NumberGoldBox
                                    pool={this.state.pool}
                                    page={this.state.page}
                                    handleDraw={this.handleDraw}
                                    current={this.state.current}
                                />
                                <NumberRangeBox
                                    min={this.state.min}
                                    max={this.state.max}
                                    editnumrange={this.editnumrange}
                                />
                                <NumberRecord
                                    result={this.state.result}
                                    handleReset={this.handleReset}
                                />
                            </div> :
                            <div>
                                <NameGoldBox
                                    page={this.state.page}
                                    pair={this.state.pair}
                                    pool={this.state.pool}
                                    handleDraw={this.handleDraw}
                                    current={this.state.current}
                                />
                                <NameSettingBox
                                    pair={this.state.pair}
                                    editnamerange={this.editnamerange}
                                />
                                <NameRecord
                                    result={this.state.result}
                                    handleReset={this.handleReset}
                                    pair={this.state.pair}
                                />
                                <NameList
                                    editnamerange={this.editnamerange}
                                    nameList={this.state.nameList}
                                    pool={this.state.pool}
                                />
                            </div>
                }
            </main>
        )
    }
}
class RandomNumbers extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="boxes number-box" id="edit-numbers">
                <h2>Draw Random Numbers</h2>
                <p className="notes">*Maximum range: &nbsp;<b>1</b> - <b>100,000</b></p>
                <form onSubmit={this.props.toPageOne} className="range-group">
                    <span className="range-text">Enter Range:</span>
                    <input className="range-input" onChange={this.props.handleRangeMin} type="number" name="minimum" min="1" max="99999" defaultValue={this.props.min} />
                    to
                    <input className="range-input" onChange={this.props.handleRangeMax} type="number" name="maximum" min="2" max="100000" defaultValue={this.props.max} />
                    <button className="start-btn" type="sumit">Start
                        <span className="material-icons">
                            arrow_right
                        </span>
                    </button>
                </form>
                <div className="number-box-shadow box-shadow"></div>
            </div>
        )
    }
}

class RandomNames extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const namelist = this.props.nameList;

        return (
            <div className="boxes name-box" id="edit-names">
                <h2>Draw Random Names</h2>
                <div className="name-info-box">
                    <div className="name-setting-div">
                        <form>
                            <h4>Enter Names:</h4>
                            <div className="name-form">
                                <input required={(namelist.length == 0)} id="new-name" maxLength="15" onChange={this.props.handleNameInput} className="name-input" type="text" name="name" placeholder="Enter Name ..." />
                                <button onClick={this.props.addName} className="addname-btn" type="button">Add Name
                                </button>
                            </div>
                            <div className="mode-form">
                                <h4>Mode:</h4>
                                <label htmlFor="one-name">
                                    <input onChange={this.props.editpair} id="one-name" name="mode" value="0" type="radio" checked={(this.props.pair == 0)} />
                                    <span>Draw <b>1 person</b> each time</span>
                                </label>
                                <label htmlFor="two-name">
                                    <input onChange={this.props.editpair} id="two-name" name="mode" value="1" type="radio" checked={(this.props.pair == 1)} />
                                    <span>Draw <b>pairs</b> each time</span>
                                </label>

                                <button onClick={this.props.toPageOneName} className="start-btn" type="submit">Start
                                    <span className="material-icons">
                                        arrow_right
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="namelist">
                        <h4 >Name List:</h4>
                        {namelist.map((e, i) =>
                            <div key={i} className="name-tag">
                                <span>{i + 1}. {e}</span>
                                <a title="Delete" onClick={this.props.delName} id={"name" + i} key={i} className="material-icons delete-icon">
                                    do_not_disturb_on
                                </a>
                            </div>
                        )}
                        <button title="Add Name" onClick={this.props.focusNewName} className="name-tag add-btn">
                            <span className="material-icons add-icon">
                                add
                            </span>
                        </button>
                        {(this.props.nameList.length < 5) ? [...Array(5 - this.props.nameList.length)].map((e, i) =>
                            <div key={i} className="name-tag" />
                        ) : null}
                <button className="reset-btn" onClick={this.props.resetNamelist}>
                    Reset Name List
                </button>
                    </div>
                </div>
                <div className="name-box-shadow box-shadow"></div>
            </div>
        )
    }
}



class NumberGoldBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const goldbox = (this.props.page == 2) ?
            <div className="luckyball-div"><div className="luckyball-bg"></div><div className="luckyball-box"><p className="luckyball">{this.props.current}</p></div></div> :
            (this.props.pool.length == 0) ? <p>All numbers are drawn.</p> :
                <img className="box-img" src="images/luckybox.svg" alt="lucky draw box " />;
        const button = (this.props.page == 2) ? "Next" : 'Draw';
        const disable = (this.props.pool.length == 0 && this.props.page == 1) ? true : false;


        return (
            <div className="gold-box">
                <div className="lucky-box-div">
                    {goldbox}
                </div>
                <button disabled={disable} onClick={this.props.handleDraw} className="start-btn start-btn-L" type="submit">{button}
                    <span className="material-icons">
                        arrow_right
                    </span>
                </button>
            </div>
        )
    }
}

class NameGoldBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const goldbox = (i) => (this.props.page == 2) ?
            <div className="luckycard-div-div">
                <div className="luckycard-div">
                <p className="luckycard">{(this.props.pair == true) ? "No. " + (this.props.current[i][0] + 1) : "No. " + (this.props.current[0] + 1)}</p>
                <p className="luckycard luckyname">{(this.props.pair == true) ? this.props.current[i][1] : this.props.current[1]}</p>
                <div className="luckycard underline-div">
                    <div className="underline-cap" />
                    <div className="underline" />
                    <div className="underline-cap" />
                </div>
                
                </div>
                <div className="luckyball-bg"></div>
            </div> :
            (this.props.pool.length == 0) ? <p>All names are drawn.</p> :
                (this.props.pair == true && this.props.pool.length == 1) ? <p>Only one name left.</p> :
                <div className="luckycard-div-div">
                    <img className="box-img" src="images/luckybox.svg" alt="lucky draw box" />
               </div>;
        const button = (this.props.page == 2) ? "Next" : 'Draw';
        const disable = (this.props.pool.length == 0 && this.props.page == 1) ? true :
            (this.props.pair == true && this.props.pool.length == 1 && this.props.page == 1) ? true :
                false;

        return (
            <div className="gold-box">
                <div className="lucky-box-div">
                    {goldbox(0)}
                    {(this.props.pair == false) ? null :
                        (this.props.pool.length == 0 && this.props.page == 1) ? null :
                            (this.props.pair == true && this.props.pool.length == 1 && this.props.page == 1) ? null :
                                goldbox(1)}
                </div>
                <button disabled={disable} onClick={this.props.handleDraw} className="start-btn start-btn-L" type="submit">{button}
                    <span className="material-icons">
                        arrow_right
                    </span>
                </button>
            </div>
        )
    }
}

class NumberRangeBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="boxes range-box">
                <div className="range-group">
                    <span className="range-text">Range:</span>
                    <input className="range-input" type="number" name="minimum" min="1" max="99999" defaultValue={this.props.min} disabled />
                    to
                    <input className="range-input" type="number" name="maximum" min="2" max="100000" defaultValue={this.props.max} disabled />
                    <button onClick={this.props.editnumrange} className="edit-btn" >Edit
                    </button>
                </div>
                <div className="range-box-shadow box-shadow"></div>
            </div>
        )
    }
}

class NumberRecord extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let result = this.props.result;
        return (
            <div className="boxes record-box">
                <h3>Drawn Record:</h3>
                <p className="notes">*Numbers drawn are not repeated.</p>
                <div className="nums-group">
                    {(result.length == 0) ?
                        <p className="no-result-text">No numbers are drawn.</p> :

                        result.map(e => <div key={e} className="nums-drawn">{e}</div>
                        )}
                </div>
                <button className="reset-btn" onClick={this.props.handleReset}>
                    Reset Drawn
                </button>
                <div className="record-box-shadow box-shadow"></div>
            </div>
        )
    }
}



class NameSettingBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="boxes range-box">
                <form className="mode-form-s">
                    <div>
                        <div className="mode-select">
                            <p>Mode:</p>
                            <label htmlFor="one-name">
                                <input id="one-name" name="mode" value="0" type="radio" checked={(this.props.pair == 0)} disabled />
                                <span>Draw <b>1 person</b></span>
                            </label>
                            <label htmlFor="two-name">
                                <input id="two-name" name="mode" value="1" type="radio" checked={(this.props.pair == 1)} disabled />
                                <span>Draw <b>pairs</b></span>
                            </label>
                        </div>

                    </div>
                    <button onClick={this.props.editnamerange} className="edit-btn" >Edit
                    </button>
                </form>
                <div className="range-box-shadow box-shadow"></div>
            </div>
        )
    }
}

class NameRecord extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let result = this.props.result;
        return (
            <div className="boxes record-box name-box">
                <h3>Drawn Record:</h3>
                <div className="names-result-group">
                    {(result.length == 0) ?
                        <p className="no-result-text">No numbers are drawn.</p> :
                        (this.props.pair == false) ?
                            result.map(e =>
                                <div key={e} className="names-drawn">{e[0] + 1}. {e[1]}</div>) :
                            result.map(e =>
                                <div key={e} className="pair-name-div">
                                    <div className="names-drawn">{e[0][0] + 1}. {e[0][1]}</div>
                                    <div className="pair-name-link"/>
                                    <div className="names-drawn">{e[1][0] + 1}. {e[1][1]}</div>
                                </div>
                            )}
                </div>
                <button onClick={this.props.handleReset} className="reset-btn">
                    Reset Drawn
                </button>
                <div className="record-box-shadow box-shadow"></div>
            </div>
        )
    }
}
class NameList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let nameList = this.props.nameList;
        return (
            <div className="boxes list-box name-box">
                <div className="name-list-top">
                    <h3>Name List:</h3>
                    <button onClick={this.props.editnamerange} className="addname-btn" >Edit</button>
                </div>
                <div className="names-result-group">
                    {(nameList.length == 0) ?
                        <p className="no-result-text">Name list is empty.</p> :
                        nameList.map((e, i) =>
                            <div key={i} className="names-drawn">{i + 1}. {e}
                            </div>
                        )}
                </div>
                <div className="list-box-shadow box-shadow"></div>
            </div>
        )
    }
}
ReactDOM.render(<MyApp />, document.getElementById('myApp'));