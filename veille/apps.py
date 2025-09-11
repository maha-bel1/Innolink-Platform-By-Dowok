from django.apps import AppConfig

class VeilleConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "veille"

    def ready(self):
        # Créer les index Mongo au démarrage
        from .services.mongo import ensure_indexes
        try:
            ensure_indexes()
        except Exception:
            # éviter de bloquer le démarrage si Mongo n'est pas up
            pass