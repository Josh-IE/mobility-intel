from rest_framework import views
from rest_framework.response import Response
from simulator.simulator import Simulator

from .serializers import SimulateSerializer
from ..utils.utils import tuple_from_dict


class Simulate(views.APIView):
    """
    View to retrieve simulated result.
    """

    permission_classes = []

    def post(self, request, *args, **kwargs):
        """
        Return simulated result
        """
        serializer = SimulateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        number_of_requests = data.pop("number_of_requests")
        request_tuple = tuple_from_dict(data)
        simulator = Simulator(request_tuple)
        result = simulator.simulate(number_of_requests)
        return Response(result)
