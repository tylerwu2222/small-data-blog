export default function BackgroundImage({ fileName, classes = '',style}) {
  return (
    <img src={fileName} style={style} className={classes + 'img-bg'}></img>
  )
}
