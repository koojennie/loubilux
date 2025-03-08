import cx from 'classnames';
interface ReachedTextProps {
    title: string;
    desc: string;
    'ms-lg-35'?: boolean;
}
export default function Text(props: Partial<ReachedTextProps>) {
  const { title, desc, 'ms-lg-35': msLg35 } = props;
  const classTitle = cx({
    'me-lg-35': true,
    'ms-lg-35': msLg35
  })
  return (
    <div className={classTitle}>
      <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
        {title}
      </p>
      <p className="text-lg text-lg-start text-center color-palette-2 m-0">
        {desc}
      </p>
    </div>
  );
}
