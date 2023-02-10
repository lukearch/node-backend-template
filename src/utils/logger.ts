import appSettings from '@Config/settings';
import NodeEnv from '@Enums/NodeEnv';
import { Formats, JetLogger, LoggerModes } from 'jet-logger';

const logger = JetLogger(
  LoggerModes.Console,
  '',
  appSettings.node.env == NodeEnv.Production,
  false,
  Formats.Line
);

export default logger;
