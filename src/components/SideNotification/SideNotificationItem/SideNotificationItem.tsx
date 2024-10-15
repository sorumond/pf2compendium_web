import './SideNotificationItem.css';
import { useEffect, useRef } from 'react';
import { publish } from '../../../events';

const animationTime = 2;
const showAnimationDuration = 0.4;
const hideAnimation = 0.8;

export function SideNotificationItem(props: { id: number, itemPosition: number, text: string }) {

    const item = useRef<HTMLInputElement>();

    useEffect(() => {
        setTimeout(() => {
            item.current.classList.add('Hide');
            setTimeout(() => {
                publish('deleteNotificationItem', { id: props.id });
            }, (hideAnimation) * 1000);
        }, (animationTime + showAnimationDuration) * 1000);
    }, []);

    return (
        <div key={props.id} ref={item} style={{ top: `${(props.itemPosition) * 50}px`, animationDuration: `${showAnimationDuration}s` }} className="side-notification-item">
            <div className='side-notification-item__text-bar'>{props.text}</div>
            <div className="side-notification-item__progress-bar" style={{ animationDuration: `${animationTime}s`, animationDelay: `${showAnimationDuration}s` }}></div>
        </div>
    );
}