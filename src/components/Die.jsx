import React from "react"

export default function Die(props) {
    return (
        <div onClick={props.holdHandler} className={!props.isHeld ? "die-face" : "die-face-held"}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}