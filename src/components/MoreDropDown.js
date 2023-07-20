import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropDown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-solid fa-ellipsis-vertical"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropDown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots}/>

            <Dropdown.Menu 
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item 
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className="fa-solid fa-square-pen"></i>
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fa-solid fa-trash"></i>
                </Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    );
};

