import MostLiked from './MostLiked';
import YourViewed from './YourViewed';
import OtherItems from './OtherItems';
import "./mainpage.css";

export default function MainPage() {
    return (
        <section>
            <article>
                <MostLiked />
                <YourViewed />
                <OtherItems />
            </article>
        </section>
    );
}