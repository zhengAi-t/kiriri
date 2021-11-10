let module={};

import application from '../../../../lib/buildup';
application.file.then(file=>module.file=file);

module.maxSize=40*1024*1024;

export default module;