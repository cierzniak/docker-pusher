import dockerode, { ContainerTaskSpec, ServiceSpec } from 'dockerode';

export const docker = new dockerode({ socketPath: '/var/run/docker.sock' });

type Service = {
  id: string;
  name: string;
  image: string;
};

export const getServices = () =>
  docker.listServices().then((service) =>
    service.map((singleService) => {
      const template = singleService.Spec?.TaskTemplate as ContainerTaskSpec;
      const image = template.ContainerSpec?.Image?.split('@');
      return {
        id: singleService.ID,
        name: singleService.Spec?.Name,
        image: (image ?? [''])[0],
      } as Service;
    }),
  );

export const updateService = async ({ id, image }: Service) => {
  const service = docker.getService(id);
  const { Version, Spec } = await service.inspect();

  service.update(
    {
      _query: { registryAuthFrom: 'spec', version: Version.Index },
      _body: prepareSpec(Spec, image),
    } as {
      authconfig: { serveraddress: string; username: string; password: string };
      _query: { registryAuthFrom: 'spec' | 'previous-spec'; version: number };
      _body: ServiceSpec;
    },
    () => undefined,
  );
};

const prepareSpec = (spec: ServiceSpec, image: string) => {
  const newSpec = { ...spec };
  if (newSpec.TaskTemplate) {
    newSpec.TaskTemplate.ForceUpdate = (spec.TaskTemplate?.ForceUpdate ?? 0) + 1;
    if ('ContainerSpec' in newSpec.TaskTemplate && newSpec.TaskTemplate.ContainerSpec) {
      newSpec.TaskTemplate.ContainerSpec.Image = image;
    }
  }

  return newSpec;
};
