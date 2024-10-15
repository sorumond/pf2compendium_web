import './RacesPage.css';
import catfolk from '../../assets/catfolk_transparent.png';

export function RacesPage() {
    return (
        <div className='races-page'>
            <div className='races-page__list'>
                <div className='race-item'>
                    <div className='race-item__wrapper'>
                        <div className='race-item__name'>CATFOLK</div>
                        <img src={catfolk} alt={catfolk} className='race-item__image' />
                        <div className='race-item__description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quia, et, error perspiciatis repellendus corporis molestiae, ab molestias tenetur illum dolores! Nobis, exercitationem consequuntur? Dolorem aut cumque nesciunt sequi placeat.</div>
                    </div>
                </div>
                <div className='race-item'>
                    <div className='race-item__wrapper'>
                        <div className='race-item__name'>CATFOLK</div>
                        <img src={catfolk} alt={catfolk} className='race-item__image' />
                        <div className='race-item__description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quia, et, error perspiciatis repellendus corporis molestiae, ab molestias tenetur illum dolores! Nobis, exercitationem consequuntur? Dolorem aut cumque nesciunt sequi placeat.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}