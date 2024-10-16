# main.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from scipy.signal import butter, filtfilt, firwin, sosfilt, lfilter, hilbert
import numpy as np

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def audiooscillator(frequency, num_points=10000):
    x_values = np.linspace(0, 5/frequency, num_points)
    y_values = np.sin(2 * np.pi * frequency * x_values)
    return {"x": x_values.tolist(), "y": y_values.tolist()}
    
def mastersignal(amplitude, num_points=10000):
    x_values = np.linspace(0, 5/amplitude, num_points)
    y_values = np.sin(2 * np.pi * amplitude * x_values)
    return {"x": x_values.tolist(), "y": y_values.tolist()}

def generate_sin_wave(frequency, amplitude, A1, B1, num_points=10000):
    x_values = np.linspace(0, 5/frequency, num_points)
    y_values = (B1 + (A1 * np.sin(2 * np.pi * frequency * x_values))) * np.sin(2 * np.pi * amplitude * x_values)
    return {"x": x_values.tolist(), "y": y_values.tolist()}
    
def additional_processing_am(frequency, amplitude, A1, B1, num_points=10000):
    x_values = np.linspace(0, 5/frequency, num_points)
    y_values = (B1 + (A1 * np.sin(2 * np.pi * frequency * x_values))) * np.sin(2 * np.pi * amplitude * x_values)
    # Amplitude Demodulation
    demodulated_signal = y_values * np.sin(2 * np.pi * amplitude * x_values)

    # Low-pass filter to remove high-frequency components
    fs = amplitude * 10
    cutoff_frequency = frequency
    b, a = butter(6, cutoff_frequency / (fs/2), 'low')
    demodulated_signal_filtered = filtfilt(b, a, demodulated_signal)
    return {"x": x_values.tolist(), "y": demodulated_signal_filtered.tolist()}



def processing_fm(frequency, amplitude, numpoints = 10000):
    kf = 50
    fs = amplitude * 10
    x_values = np.linspace(0, 5 / frequency, numpoints)
    message_signal = np.sin(2 * np.pi * frequency * x_values)
    #phase_deviation = kf * np.cumsum(message_signal) * (frequency / fs) * 2 * np.pi
    #modulated_signal = np.sin(2 * np.pi * amplitude * x_values + phase_deviation)
    modulated_signal = np.cos(2*np.pi*amplitude*x_values + kf*np.cumsum(message_signal)/fs)
    
    #def frequency_modulation(message_signal, fc, kf, fs):
    #t = np.arange(0, len(message_signal)/fs, 1/fs)
    #modulated_signal = np.cos(2*np.pi*fc*t + kf*np.cumsum(message_signal)/fs)
    #return modulated_signal

    return {"x": x_values.tolist(), "y": modulated_signal.tolist()}


#def butter_lowpass_filter_fm(data, frequency, amplitude, fs, order=4):
    #nyquist = 0.5 * fs
    #cutoff_frequency = frequency
    #normal_cutoff = cutoff_frequency / nyquist
    #b, a = butter(order, normal_cutoff, btype='low', analog=False)
    #y = filtfilt(b, a, data)
    #return y
"""
def additional_processing_fm(frequency, amplitude, num_points=10000):
    kf = 50
    fs = amplitude * 10
    x_values1 = np.linspace(0, 5 / frequency, num_points)
    message_signal = np.sin(2 * np.pi * frequency * x_values1)
    phase_deviation = kf * np.cumsum(message_signal) * (frequency / fs) * 2 * np.pi
    modulated_signal = np.sin(2 * np.pi * amplitude * x_values1 + phase_deviation)
    
    x_values = np.linspace(0, 5 / frequency, len(modulated_signal))

    phase_deviation = kf * np.cumsum(np.ones(len(modulated_signal)) * (frequency / fs)) * 2 * np.pi
    demodulated_signal1 = np.gradient(modulated_signal) / (2 * np.pi * frequency)
    
    # Apply low-pass filter to the demodulated signal
    demodulated_signal = butter_lowpass_filter_fm(demodulated_signal1, frequency, amplitude, fs)
    
    # Scale the demodulated signal's amplitude
    demodulated_signal = 5000000 * demodulated_signal

    return {"x": x_values.tolist(), "y": demodulated_signal.tolist()}
    """
def additional_processing_fm(frequency, amplitude):
    kf = 50
    fs = amplitude * 10
    x_values = np.linspace(0, 5 / frequency, 10000)
    message_signal = np.sin(2 * np.pi * frequency * x_values)
    #phase_deviation = kf * np.cumsum(message_signal) * (frequency / fs) * 2 * np.pi
    #modulated_signal = np.sin(2 * np.pi * amplitude * x_values + phase_deviation)
    modulated_signal = np.cos(2*np.pi*amplitude*x_values + kf*np.cumsum(message_signal)/fs)
    instantaneous_phase = np.unwrap(np.angle(hilbert(modulated_signal)))
    demodulated_signal1 = np.diff(instantaneous_phase) * fs / (2*np.pi*kf)
    
    # Low-pass filter with cutoff frequency same as message signal frequency
    order = 8
    cutoff_frequency = frequency
    nyquist = 0.5 * fs
    normal_cutoff = cutoff_frequency / nyquist
    
    b, a = butter(order, normal_cutoff, btype='low', analog=False)
    
    # Apply the filter using lfilter
    demodulated_signal = lfilter(b, a, demodulated_signal1)
    
    
    return {"x": x_values.tolist(), "y": demodulated_signal.tolist()}
    
    
def pmmod(frequency, amplitude):
    phasedev = np.pi / 2
    Fs = 10 * amplitude  # Adjust the sampling frequency based on the carrier frequency
    x_values = np.arange(0, 1, 1/Fs)

    # Message signal
    message_signal = np.cos(2 *np.pi * frequency * x_values)

    # Phase modulation
    modulated_signal = np.cos(2 * np.pi * amplitude * x_values + phasedev * message_signal)

    return {"x": x_values.tolist(), "y": modulated_signal.tolist()}

def pmdemod(frequency, amplitude):
    phasedev = np.pi / 2
    Fs = 10 * amplitude  # Adjust the sampling frequency based on the carrier frequency
    x_values = np.arange(0, 1, 1/Fs)

    # Message signal
    message_signal = np.cos(2 * np.pi * frequency * x_values)

    # Phase modulation
    modulated_signal = np.cos(2 * np.pi * amplitude * x_values + phasedev * message_signal)
    y_analytic = hilbert(modulated_signal)
    instantaneous_phase = np.unwrap(np.angle(y_analytic))
    demodulated_signal = np.gradient(instantaneous_phase) / (2 * np.pi * amplitude / Fs)
    z = phasedev * demodulated_signal

    # Apply an alternative low-pass filter
    cutoff_frequency = frequency  # Adjust the cutoff frequency as needed
    filter_order = 8       # Adjust the filter order as needed

    # Design a low-pass FIR filter using firwin
    nyq = 0.5 * Fs
    b = firwin(filter_order, cutoff_frequency/nyq, fs=Fs, pass_zero='lowpass')

    # Apply the filter using filtfilt for zero-phase filtering
    z = filtfilt(b, 1, z)
    return {"x": x_values.tolist(), "y": z.tolist()}


def dsbsc_modulation(frequency, amplitude):
    fs = amplitude * 10                  
    x_values = np.linspace(0, 1, 10000)
    message_signal = np.sin(2 * np.pi * frequency * x_values)
    carrier_signal = np.cos(2 * np.pi * amplitude * x_values)
    dsbsc_modulated_signal = message_signal * carrier_signal
    return {"x": x_values.tolist(), "y": dsbsc_modulated_signal.tolist()}

def dsbsc_demodulation(frequency, amplitude):
    fs = amplitude * 10                  
    x_values = np.linspace(0, 1, 10000)
    message_signal = np.sin(2 * np.pi * frequency * x_values)
    carrier_signal = np.cos(2 * np.pi * amplitude * x_values)
    dsbsc_modulated_signal = message_signal * carrier_signal
    dsbsc_demodulated_signal = dsbsc_modulated_signal * carrier_signal

    # Low-pass filter the demodulated signal
    lpf_cutoff = frequency
    b, a = butter(6, lpf_cutoff / (0.5 * fs), btype='low')
    dsbsc_demodulated_signal_filtered = lfilter(b, a, dsbsc_demodulated_signal)

    return {"x": x_values.tolist(), "y": dsbsc_demodulated_signal_filtered.tolist()}
    

router = APIRouter()

@router.get("/process_data_0")
async def process_data_0(
    frequency: float = Query(1.0, description="Frequency for sine wave"),

):
    sin_wave_data = audiooscillator(frequency)
    return {"sinWaveData0": sin_wave_data, "messageFrequency": frequency}
    
@router.get("/process_data_c")
async def process_data_c(
    amplitude: float = Query(1.0, description="Frequency for carrier wave"),

):
    sin_wave_data_c = mastersignal(amplitude)
    return {"sinWaveDatac": sin_wave_data_c, "carrierFrequency": amplitude}
    
@router.get("/process_data_am")
async def process_data_am(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave"),
    A1: float = Query(1.0, description="Value for A1"),
    B1: float = Query(1.0, description="Value for B1")
):
    result = frequency * amplitude
    sin_wave_data = generate_sin_wave(frequency, amplitude, A1, B1)
    return {"result": result, "sinWaveData": sin_wave_data, "messageFrequency": frequency, "carrierFrequency": amplitude}



@router.get("/demodulation")
async def demodulation(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave"),
    A1: float = Query(1.0, description="Value for A1"),
    B1: float = Query(1.0, description="Value for B1")
):
    sin_wave_data_am = additional_processing_am(frequency, amplitude, A1, B1)
    return {"demodulation": sin_wave_data_am, "messageFrequency": frequency, "carrierFrequency": amplitude}
    
@router.get("/process_data_fm")
async def process_data_fm(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave")
):
    sin_wave_data_fm = processing_fm(frequency, amplitude)
    return {"sinWaveDataFM": sin_wave_data_fm, "messageFrequency": frequency, "carrierFrequency": amplitude}
    
@router.get("/demodulation_fm")
async def demodulation_fm(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave")

):
    sin_wave_data_fm = additional_processing_fm(frequency, amplitude)
    return {"demodulation_fm": sin_wave_data_fm, "messageFrequency": frequency, "carrierFrequency": amplitude}
    
@router.get("/process_data_pm")

async def process_data_pm(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave")
):
    sin_wave_data_pm = pmmod(frequency, amplitude)
    return {"sinWaveDataPM": sin_wave_data_pm, "messageFrequency": frequency, "carrierFrequency": amplitude}
    
@router.get("/demodulation_pm")
async def demodulation_pm(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave")

):
    sin_wave_data_pm = pmdemod(frequency, amplitude)
    return {"demodulation_pm": sin_wave_data_pm, "messageFrequency": frequency, "carrierFrequency": amplitude}
    
@router.get("/process_data_dsbsc")
async def process_data_dsbsc(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave")
):
    sin_wave_data_dsbsc = dsbsc_modulation(frequency, amplitude)
    return {"sinWaveDatadsbsc": sin_wave_data_dsbsc, "messageFrequency": frequency, "carrierFrequency": amplitude}
    
@router.get("/demodulation_dsbsc")
async def demodulation_dsbsc(
    frequency: float = Query(1.0, description="Frequency for sine wave"),
    amplitude: float = Query(1.0, description="Amplitude for sine wave")

):
    sin_wave_data_dsbsc = dsbsc_demodulation(frequency, amplitude)
    return {"demodulation_dsbsc": sin_wave_data_dsbsc, "messageFrequency": frequency, "carrierFrequency": amplitude}
    


app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
