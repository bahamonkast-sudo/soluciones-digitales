import { ArrowRight } from 'lucide-react';

/**
 * Botón CTA con efecto slide: un círculo blanco (con icono) se desliza
 * de izquierda a derecha al pasar el cursor, el gradiente se invierte
 * y el texto cambia con fade. Reutilizable entre landings.
 */
export default function SlideButton({
  label,
  hoverLabel,
  href,
  target,
  rel,
  onClick,
  icon: Icon = ArrowRight,
  width = 280,
  className = '',
  color = {},
}) {
  const cls = `btn-slide ${className}`.trim();
  const style = {
    minWidth: width,
    ...(color.start || color.end ? {
      '--bs-start': color.start || '#3a74ff',
      '--bs-end': color.end || '#0ea5e9',
      '--bs-circle': color.circle || '#2962ff',
    } : {}),
  };
  const inner = (
    <>
      <span className="circle">
        <Icon size={19} />
      </span>
      <span className="title">{label}</span>
      <span className="title title-hover">{hoverLabel || label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={cls} style={style}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}