'use strict';

import React from 'react';
import flatten from 'lodash/array/flatten';
import Tween from 'gsap/src/uncompressed/TweenMax';
import Timeline from 'gsap/src/uncompressed/TimelineLite';

export default class WordAnimator extends React.Component {
  render() {
    const text = flatten(this.props.children.map(chunk => React.isValidElement(chunk) ? chunk : chunk.replace('<br/>', ' <br/> ').split(' ').map((word, index, array) => word === '<br/>' ? word : <span className="chunk">{index === array.length - 1 ? word : `${word} `}</span>)));
    return <span className="word-animator">{text}</span>;
  }
  componentDidMount() {
    const chunkDelay = 0.3;
    const chunkDuration = 1.05 - chunkDelay;
    const chunks = [].filter.call(React.findDOMNode(this).children, element => element.tagName === "SPAN");
    const chunksTimeline = new Timeline({delay: chunkDelay});
    chunksTimeline.add(Tween.staggerFrom(chunks, chunkDuration, {
      ease: Power2.easeOut,
      opacity: 0,
      y: 30
    }, chunkDuration / chunks.length));
  }
};
