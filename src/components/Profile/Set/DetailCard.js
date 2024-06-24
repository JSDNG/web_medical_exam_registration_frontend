import { useState } from "react";
import _ from "lodash";
import "./DetailCard.scss";
const DetailCard = (props) => {
    const { index, card } = props;
    if (_.isEmpty(card)) {
        return <></>;
    }

    // console.log(card);
    return (
        <>
            <div key={`${card?.id}-card`} className="detail-card card">
                <div className="card-text">
                    <p>{card?.term}</p>
                    {/* <p>definition :{card?.definition}</p> */}
                </div>
            </div>
        </>
    );
};

export default DetailCard;
