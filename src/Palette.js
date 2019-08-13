import React, { Component } from "react";
import "./Palette.css";

export default class Palette extends Component {
    render() {
        return (
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">{/* color boxes go here */}</div>
                {/* Footer goes here */}
            </div>
        );
    }
}
