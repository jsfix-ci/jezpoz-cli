export default function BlockRender(block, index) {
  switch(block._type) {
    case 'heroBlock': {
      return (
        <HeroBlock key={index} {...block}/>
      )
    }
    default: {
      return null;
    }
  }
}


function HeroBlock({heading}) {
  return (
    <div>
      <h1>{heading}</h1>
    </div>
  );
}