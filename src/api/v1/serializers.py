from rest_framework import serializers

from ..utils.utils import is_within_territory


class SimulateSerializer(serializers.Serializer):
    min_longitude = serializers.DecimalField(
        max_digits=28, decimal_places=25, max_value=180, min_value=-180
    )
    min_latitude = serializers.DecimalField(
        max_digits=28, decimal_places=25, max_value=90, min_value=-90
    )
    max_longitude = serializers.DecimalField(
        max_digits=28, decimal_places=25, max_value=180, min_value=-180
    )
    max_latitude = serializers.DecimalField(
        max_digits=28, decimal_places=25, max_value=90, min_value=-90
    )
    number_of_requests = serializers.IntegerField()

    def validate(self, data):
        """
        checks if bounding box is within Berlin
        """
        _data = data.copy()
        _data.pop("number_of_requests", None)
        if is_within_territory(_data):
            return data
        raise serializers.ValidationError(
            {"out_of_bounds": ["The boundary box is not within Berlin."]}
        )
