import React from 'react';

export default function Loader(props){
  const text = props.text || 'Загрузка данных...';
  return (<h1 className="content__title">{text}</h1>)
}