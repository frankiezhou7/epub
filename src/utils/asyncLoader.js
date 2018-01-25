const lazyLoadComponent = (lazyModule)=>{
  return (location, cb) => {
    lazyModule(module => {
      cb(null, module)
    })
  }
};

export default (module) => __CLIENT__ ? lazyLoadComponent(module): (location, cb) => cb(null, module);
