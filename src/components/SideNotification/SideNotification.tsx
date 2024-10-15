import './SideNotification.css';
import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from '../../events';
import { SideNotificationItem } from './SideNotificationItem/SideNotificationItem';

interface ISideNotificationItem {
    id: number,
    text: string
}

export function SideNotification() {

    const [id, setId] = useState(1);
    const [topContainerItems, setTopContainerItems] = useState<Array<ISideNotificationItem>>([]);

    useEffect(() => {
        subscribe('sideNotificationCreateItem', (data) => {
            setId((prev) => {
                createItem(data.detail.text, prev);
                return prev + 1;
            });
        });

        subscribe('deleteNotificationItem', (data) => {
            setTopContainerItems((prev) => {
                const index = prev.findIndex((item) => { return item.id == data.detail.id; });
                prev.splice(index, 1);
                return [...prev];
            });
        });

        return () => {
            unsubscribe('sideNotificationCreateItem', () => {

            });
            unsubscribe('deleteNotificationItem', () => { });
        };
    }, []);

    function createItem(text, id) {
        setTopContainerItems((prev) => {
            return [...prev, { id: id, text: text }];
        });

    }

    return (
        <div className="side-notification">
            <div className="side-notification__top-container">
                {topContainerItems.map((item, index) => {
                    return item != undefined ? <SideNotificationItem id={item.id} text={item.text} key={item.id} itemPosition={topContainerItems.length - index}></SideNotificationItem> : '';
                })}
            </div>
        </div >
    );
}