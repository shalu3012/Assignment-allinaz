import './App.css';
import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

function App() {
  const canvasElement = useRef();
  const [alphabetArr, setAlphabetArr] = useState([1,2,3,4,5]);
  const [operatorArr, setOperatorArr] = useState(["+","-","*","/"]);
  const [comparatorArr, setComparatorArr] = useState(["<",">"]);
  const [comparator, setComparator] = useState("");
  const [rhs, setRhs] = useState("");
  const [equationArr, setEquationArr] = useState([]);
  const [dragTempComponent, setdragTempComponent] = useState("");
  const [mouseCoords, setMouseCoords] = useState({
    x:0,
    y:0
  });
  const mouseOffset = {
    x:50,
    y:50
  }
  const rectWidth = 140;
  useEffect(()=>{
     axios.get("http://localhost:5000/api")
    .then((res)=>{
      setAlphabetArr(res.data.calcs)
    })
    .catch((err)=>console.log(err))
  }, []);
  function drag(e) {
    setdragTempComponent(<div className={e.target.className} data-value={e.target.getAttribute("data-value")}>{e.target.innerHTML}</div>);
    console.log(e)
    setMouseCoords({
      x:e.clientX-mouseOffset.x,
      y:e.clientY-mouseOffset.y
    });
  }

  function evaluate(equation, comparator, rhs){
    let expression = "";
    equation.forEach((item)=>expression+=item.value+" ");
    expression = expression+comparator+" "+rhs;
    console.log(expression)
    try{
      alert(eval(expression));
    }catch(err){
      alert("This is not a valid equation");
    }
  }

  function removeElement(e){
    let value = e.target.getAttribute('data-value');

    setEquationArr(equationArr.filter((elem, index)=>{return index!=value})
    .map((elem, index)=>{elem.position=index*rectWidth+15; return elem}));
  }

  function handleMouseMove(e){
    setMouseCoords({
      x: e.clientX-mouseOffset.x,
      y: e.clientY-mouseOffset.y
    });
  }

  function handleMouseUp(e){
    if(dragTempComponent!=""){
      let value = e.target.getAttribute('data-value');
      console.log(`value=${value}`)
      let type = e.target.className;
      console.log(`type=${type}`)
      let alphabet = e.target.innerHTML;
      console.log(`alphabet=${alphabet}`)
      let canvasElementTop = canvasElement.current.offsetTop;
      let canvasElementHeight = canvasElement.current.clientHeight;
      let isInCanvasElement = e.clientY+window.scrollY>canvasElementTop && e.clientY+window.scrollY<canvasElementTop+canvasElementHeight;
      setdragTempComponent("");
      if(isInCanvasElement) {
        const boundRect = e.target.getBoundingClientRect();
        const position = boundRect.left+canvasElement.current.scrollLeft;
        setEquationArr([...equationArr, {value: value, type: type, alphabet: alphabet, position: position}]
          .sort((a, b)=>{return a.position-b.position})
          .map((elem, index)=>{elem.position=index*rectWidth+15; return elem})
        );
      }
    }
  }

  function renderComponent(component){
    return component;
  }

  return (
    <div className="App" onMouseMove={(e)=>handleMouseMove(e)} onMouseUp={(e)=>handleMouseUp(e)}>
      <div className="dragTempComponent" style={{position:'fixed', opacity: 1, left:mouseCoords.x, top:mouseCoords.y}}>
      {
        renderComponent(dragTempComponent)
      }
      </div>
      <div className="alphabets">
        {
          alphabetArr.map((operand,index)=><div className="alphabet-box" key={index} draggable="true" onDragStart={(e)=>drag(e)} data-value={operand.value}>{operand.alphabet}</div>)
        }
      </div>
      <br/>
      <div className="operators">
        {
          operatorArr.map((operator,index)=><div className="operator-box" key={index} draggable="true" onDragStart={(e)=>drag(e)} 
          data-value={operator}>{operator}</div>)
        }
        <span className="space"></span>
        {
          comparatorArr.map((comparator,index)=><div className="comparator-box" key={index} data-value={comparator}
          onClick={(e)=>setComparator(e.target.getAttribute('data-value'))}>{comparator}</div>)
        }
        <span className="space"></span>
        <div className="rhs" onClick={()=>{
          let rhs = prompt("What should be the rhs integer?", "");
          (rhs.trim()!="")?setRhs(rhs):setRhs("")
        }}>RHS Integer</div>
      </div>
      <br/>
      <div className="canvas"  ref={canvasElement}>
        {
          equationArr.map((elem, index)=><div key={index} className={elem.type}><span className="remove" onClick={(e)=>removeElement(e)} data-value={index}>x</span>{elem.alphabet}</div>)
        }
        {
          comparator && <div className="comparator-box" ><span className="remove" onClick={()=>setComparator("")}>x</span>{comparator}</div>
        }
        {
          rhs && <div className="rhs"><span className="remove" onClick={()=>setRhs("")}>x</span>{rhs}</div>
        }
      </div>
      <button className="submit" onClick={()=>evaluate(equationArr, comparator, rhs)}>Evaluate</button>

    </div>
  );
}

export default App;
