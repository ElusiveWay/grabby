import React,{Component} from 'react'
import mySvg from '../../image2vector.svg'

const Load = (props) =>{
        const shift = props.shift || 0
        let clas = [new Date].toLocaleString().replace(/\D/g,"")+Math.floor(Math.random()*10000)
        const render = 
            <div className={`load${clas}`} >
                <style dangerouslySetInnerHTML={{__html:`
                @keyframes loading {
                    0%{
                        transform: translate(-50%, calc(-50% + ${shift}px)) rotate(0deg);
                    }
                    100%{
                        transform: translate(-50%, calc(-50% + ${shift}px)) rotate(360deg);
                    }
                }
                .load${clas}{
                    position:fixed;
                    background-image: url(${mySvg});
                    background-position: center center;
                    background-size:100px 100px;
                    background-repeat:no-repeat;
                    top:50%;
                    left:50%;
                    transform: translate(-50%, calc(-50% + ${shift}px));
                    animation-duration: 1.5s;
                    animation-name: loading;
                    animation-iteration-count: infinite;
                    z-index:9999999999;
                    background-color:#0002;
                    width:150vmax;
                    height:150vmax;
                }
                `}}/>
            </div>
            return render
}
export default Load