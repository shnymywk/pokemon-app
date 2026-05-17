import React from 'react'
import './Card.css';

const Card = ({ pokemon }) => {
    return (
        <div className="card">
            <div className="cardImage">
                <img src={pokemon.sprites.front_default}/>
            </div>
            <h3 className="cardName">{pokemon.name}</h3>
            <div className="cardTypes">
                <div>タイプ</div>
                {/* pokemon.typesの配列をtypeとして1つずつ展開 */}
                {pokemon.types.map((type) => {
                    return (
                    //map関数のkeyをtypeのnameとして設定。
                    <div key={type.type.name}>
                        <span>{type.type.name}</span>
                    </div>
                    );
                })}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className="title">重さ：{pokemon.weight}</p>
                </div>
                <div className="cardData">
                    <p className="title">高さ：{pokemon.height}</p>
                </div>
                <div className="cardData">
                    {/* abilitiesの一番最初の配列からability.nameを取得 */}
                    <p className="title">アビリティ：{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;